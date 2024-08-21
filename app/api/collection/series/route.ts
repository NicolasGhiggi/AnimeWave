import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
    const { collectionId, seriesId } = await req.json();

    if (!collectionId || !seriesId) {
        return NextResponse.json({ error: 'Missing collectionId or seriesId' }, { status: 400 });
    }

    try {
        await query(
            'INSERT INTO collections_has_series (collections_id, series_id) VALUES (?, ?)',
            [collectionId, seriesId]
        );

        const lastUpdate = new Date().toISOString().split('T')[0];
        await query(
            `UPDATE collections SET  last_update = ? WHERE id = ?`,
            [lastUpdate, collectionId]
        );

        return NextResponse.json({ message: 'Series added to collection successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding series to collection:', error);
        return NextResponse.json({ error: 'Failed to add series to collection' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { collectionId, seriesId } = await req.json();

    if (!collectionId || !seriesId) {
        return NextResponse.json({ error: 'Missing collectionId or seriesId' }, { status: 400 });
    }

    try {
        await query(
            'DELETE FROM collections_has_series WHERE collections_id = ? AND series_id = ?',
            [collectionId, seriesId]
        );

        const lastUpdate = new Date().toISOString().split('T')[0];
        await query(
            `UPDATE collections SET  last_update = ? WHERE id = ?`,
            [lastUpdate, collectionId]
        );

        return NextResponse.json({ message: 'Series removed from collection successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error removing series from collection:', error);
        return NextResponse.json({ error: 'Failed to remove series from collection' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const collectionId = url.searchParams.get('collectionId');
    const userId = url.searchParams.get('userId');

    if (!collectionId || !userId) {
        return NextResponse.json({ error: 'Missing collectionId or userId' }, { status: 400 });
    }

    try {
        const collectionResult = await query(`
            SELECT id, title, color, description, last_update
            FROM collections
            WHERE id = ? AND user_id = ?
        `, [collectionId, userId]);

        if (!Array.isArray(collectionResult) || collectionResult.length === 0) {
            return NextResponse.json({ error: 'Collection not found or user unauthorized' }, { status: 404 });
        }

        const collection = collectionResult[0];

        const numSeriesResult = await query(`
            SELECT COUNT(*) AS num_series
            FROM collections_has_series
            WHERE collections_id = ?
        `, [collectionId]);

        if (!Array.isArray(numSeriesResult) || numSeriesResult.length === 0) {
            return NextResponse.json({ error: 'Failed to retrieve number of series' }, { status: 500 });
        }

        const numSeries = numSeriesResult[0]?.num_series ?? 0;

        const seriesResult = await query(`
            SELECT s.id, 
                s.title, 
                s.image_src AS image, 
                s.description, 
                s.release_date, 
                s.alternative_title, 
                s.previous_season,
                GROUP_CONCAT(DISTINCT g.name ORDER BY g.name ASC) AS categories, 
                s.type_name AS type, 
                st.name AS studio, 
                COUNT(DISTINCT e.id) AS total_episodes
            FROM collections_has_series cs
                JOIN series s ON cs.series_id = s.id
                LEFT JOIN series_has_genres sg ON s.id = sg.series_id
                LEFT JOIN genres g ON sg.genre_name = g.name
                LEFT JOIN studios st ON s.studio_id = st.id
                LEFT JOIN episodes e ON s.id = e.series_id
            WHERE cs.collections_id = ?
            GROUP BY s.id
        `, [collectionId]);

        if (!Array.isArray(seriesResult)) {
            return NextResponse.json({ error: 'Failed to retrieve series' }, { status: 500 });
        }

        const formatDate = (date: string) => {
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            };
            return new Date(date).toLocaleDateString('en-GB', options);
        };

        const seriesList = seriesResult.map((row: any) => ({
            id: row.id,
            title: row.title,
            image: row.image,
            categories: row.categories ? row.categories.split(',') : [],
            type: row.type,
            studio: row.studio,
            release_year: new Date(row.release_date).getFullYear(),
            alternative_title: row.alternative_title,
            previous_season: row.previous_season,
            description: row.description,
            total_episodes: row.total_episodes
        }));

        const response = {
            id: collection.id,
            title: collection.title,
            color: collection.color,
            num_series: numSeries,
            description: collection.description,
            last_update: formatDate(collection.last_update),
            seriesList,
        };

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error retrieving collection and series:', error);
        return NextResponse.json({ error: 'Failed to retrieve collection details' }, { status: 500 });
    }
}