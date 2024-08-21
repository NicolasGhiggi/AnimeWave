import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const results = await query(`
            SELECT 
                e.id AS episode_id,
                s.image_src AS series_image,
                e.series_id,
                e.release_date,
                e.episode_number,
                s.title AS series_title,
                GROUP_CONCAT(g.name ORDER BY g.name ASC) AS categories
            FROM 
                episodes e
            JOIN 
                series s ON e.series_id = s.id
            LEFT JOIN 
                series_has_genres shg ON s.id = shg.series_id
            LEFT JOIN 
                genres g ON shg.genre_name = g.name
            GROUP BY 
                e.id, s.image_src, e.series_id, e.release_date, e.episode_number, s.title
            ORDER BY 
                e.release_date DESC
            LIMIT 15
        `);

        if (Array.isArray(results) && results.length > 0) {
            const formattedResults = results.map((row: any) => ({
                id: row.episode_id,
                image: row.series_image,
                series_id: row.series_id,
                release_date: row.release_date,
                episode_number: row.episode_number,
                title: row.series_title,
                categories: row.categories ? row.categories.split(',') : [] // Split categories into an array
            }));

            return NextResponse.json(formattedResults);
        }

        return NextResponse.json({ error: 'No episodes found' }, { status: 404 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 });
    }
}
