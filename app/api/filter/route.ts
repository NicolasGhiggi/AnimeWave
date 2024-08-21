import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const yearsString = searchParams.get('years');
    const genresString = searchParams.get('genres');
    const typesString = searchParams.get('types');

    const years = yearsString ? yearsString.split(',') : [];
    const genres = genresString ? genresString.split(',') : [];
    const types = typesString ? typesString.split(',') : [];

    let sqlQuery = `
        SELECT 
            series.id, 
            series.title, 
            series.release_date, 
            series.image_src AS image, 
            series.description, 
            studios.name AS studio, 
            types.name AS type, 
            GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name ASC) AS categories,
            COUNT(DISTINCT episodes.id) AS total_episodes
        FROM 
            series
            LEFT JOIN episodes ON series.id = episodes.series_id
            JOIN studios ON series.studio_id = studios.id
            JOIN types ON series.type_name = types.name
            LEFT JOIN series_has_genres ON series.id = series_has_genres.series_id
            LEFT JOIN genres ON series_has_genres.genre_name = genres.name
        WHERE 1=1
    `;
    const values: any[] = [];

    if (years.length > 0) {
        const yearConditions = years.map(() => `YEAR(series.release_date) = ?`).join(' OR ');
        sqlQuery += ` AND (${yearConditions})`;
        values.push(...years);
    }

    if (genres.length > 0) {
        const genreConditions = genres.map(() => `genres.name = ?`).join(' OR ');
        sqlQuery += ` AND (${genreConditions})`;
        values.push(...genres);
    }

    if (types.length > 0) {
        const typeConditions = types.map(() => `types.name = ?`).join(' OR ');
        sqlQuery += ` AND (${typeConditions})`;
        values.push(...types);
    }

    sqlQuery += `
        GROUP BY 
            series.id, 
            series.title, 
            series.release_date, 
            series.image_src, 
            series.description, 
            studios.name, 
            types.name
    `;

    try {
        const results = await query(sqlQuery, values);

        const formattedResults = results.map((seriesInfo: any) => ({
            id: seriesInfo.id,
            title: seriesInfo.title,
            image: seriesInfo.image,
            studio: seriesInfo.studio,
            type: seriesInfo.type,
            release_year: new Date(seriesInfo.release_date).getFullYear(),
            description: seriesInfo.description,
            categories: seriesInfo.categories ? seriesInfo.categories.split(',') : [],
            total_episodes: seriesInfo.total_episodes
        }));

        return NextResponse.json(formattedResults);
    } catch (error) {
        console.error('Database query failed:', error);
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}

export async function POST() {
    try {
        const genres = await query('select * from genres');
        const types = await  query('select * from types');
        const formattedGenres = genres.map((info: any) => ({ value: info.name, label: info.name }));
        const formattedTypes = types.map((info: any) => ({ value: info.name, label: info.name }));
        return NextResponse.json({ genres: formattedGenres, types: formattedTypes });
    } catch (error) {
        console.error('Database query failed:', error);
        return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 });
    }
}
