import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        const results = await query(`
            SELECT s.id, s.title, s.image_src AS image, GROUP_CONCAT(g.name ORDER BY g.name ASC) AS categories
            FROM series s
            LEFT JOIN series_has_genres shg ON s.id = shg.series_id
            LEFT JOIN genres g ON shg.genre_name = g.name
            GROUP BY s.id, s.title, s.image_src
            ORDER BY s.release_date DESC
            LIMIT 7
        `);

        if(Array.isArray(results) && results.length > 0) {
            const formattedResults = results.map((row: any) => ({
                id: row.id,
                title: row.title,
                image: row.image,
                categories: row.categories ? row.categories.split(',') : []
            }));
            return NextResponse.json(formattedResults);
        }
        return NextResponse.json({ error: 'No series found' }, { status: 404 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the data' + error }, { status: 500 });
    }
}