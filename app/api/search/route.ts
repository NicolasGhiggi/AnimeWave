import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get('text');

    if (text) {
        try {
            const results = await query(`
                SELECT 
                    series.id, 
                    series.title, 
                    series.alternative_title,
                    series.release_date AS release_year,
                    series.image_src AS image, 
                    series.description, 
                    studios.name AS studio, 
                    types.name AS type, 
                    COUNT(episodes.id) AS total_episodes
                FROM 
                    series 
                    LEFT JOIN episodes ON series.id = episodes.series_id
                    JOIN studios ON series.studio_id = studios.id
                    JOIN types ON series.type_name = types.name
                WHERE 
                    series.title LIKE ?
                    OR series.alternative_title LIKE ?
                GROUP BY 
                    series.id, 
                    series.title, 
                    series.release_date, 
                    series.image_src, 
                    series.description, 
                    studios.name, 
                    types.name;
            `, [`%${text}%`, `%${text}%`]);

            const formattedResults = results.map(seriesInfo => ({
                ...seriesInfo,
                release_year: new Date(seriesInfo.release_year).getFullYear()
            }));

            return NextResponse.json(formattedResults);
        } catch (error) {
            console.error('Database query error:', error);
            return NextResponse.json({ error: 'Database query error', details: error }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'No search text provided' }, { status: 400 });
    }
}
