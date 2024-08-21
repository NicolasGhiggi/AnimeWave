import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (userId) {
        try {
            const results = await query(`
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
                FROM series
                    JOIN history ON history.series_id = series.id
                    LEFT JOIN episodes ON series.id = episodes.series_id
                    JOIN studios ON series.studio_id = studios.id
                    JOIN types ON series.type_name = types.name
                    LEFT JOIN series_has_genres ON series.id = series_has_genres.series_id
                    LEFT JOIN genres ON series_has_genres.genre_name = genres.name
                WHERE
                    history.user_id = ?
                GROUP BY
                    history.watch_date
                ORDER BY
                    history.watch_date DESC;
            `, [userId]);

            if (results.length > 0) {
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
            } else {
                return NextResponse.json({ error: 'Series not found' }, { status: 404 });
            }
        } catch (error) {
            console.error('Error retrieving series:', error);
            return NextResponse.json({ error: 'Error retrieving series' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }
}
