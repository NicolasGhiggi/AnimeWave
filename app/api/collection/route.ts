import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from "next/headers";
import crypto from 'crypto';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const seriesId = searchParams.get('seriesId');

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
        }

        let sql: string = ``;
        let params: Array<any> = [];

        if (seriesId) {
            sql = `
                SELECT 
                    collections.id,
                    collections.title, 
                    collections.color, 
                    collections.description, 
                    COUNT(collections_has_series.collections_id) AS num_series,
                    CASE 
                        WHEN EXISTS (
                            SELECT 1
                            FROM collections_has_series
                            WHERE collections_has_series.collections_id = collections.id
                              AND collections_has_series.series_id = ?
                        ) THEN TRUE
                        ELSE FALSE
                    END AS has_series
                FROM 
                    collections
                LEFT JOIN 
                    collections_has_series 
                    ON collections_has_series.collections_id = collections.id
                WHERE 
                    collections.user_id = ? 
                GROUP BY 
                    collections.id
                ORDER BY 
                    collections.last_update DESC;
            `;
            params = [seriesId, userId];
        } else {
            sql = `
                SELECT 
                    collections.id,
                    collections.title, 
                    collections.color, 
                    collections.description, 
                    COUNT(collections_has_series.collections_id) AS num_series
                FROM 
                    collections
                LEFT JOIN 
                    collections_has_series 
                    ON collections_has_series.collections_id = collections.id
                WHERE 
                    collections.user_id = ? 
                GROUP BY 
                    collections.id
                ORDER BY 
                    collections.last_update DESC;
            `;
            params = [userId];
        }

        const results = await query(sql, params);

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json({ error: 'Failed to fetch collections: ' + error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, color, description, userId } = await req.json();

        if (!title || !color || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const lastUpdate = new Date().toISOString().split('T')[0];

        const sql: string = `INSERT INTO collections (title, color, description, last_update, user_id) VALUES (?, ?, ?, ?, ?)`;
        const params: any[] = [title, color, description, lastUpdate, userId];

        await query(sql, params);

        return NextResponse.json({ message: 'Collection created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id, password } = await req.json();
        if (!id || !password) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

        const userCookie = cookies().get('user_data');
        if (!userCookie) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

        const userData = JSON.parse(userCookie.value);

        const userResult = await query('SELECT * FROM users WHERE id = ?', [userData.id]);
        if (userResult.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const user = userResult[0];

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) return NextResponse.json({ error: 'Invalid password' }, { status: 401 });


        await query('DELETE FROM collections WHERE id = ?', [id]);

        return NextResponse.json({ success: 'Collection deleted successfully' });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, title, color, description } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'ID, Title, Color are required' }, { status: 400 });
        }

        const lastUpdate = new Date().toISOString().split('T')[0];

        const result = await query(
            `UPDATE collections SET title = ?, color = ?, description = ?, last_update = ? WHERE id = ?`,
            [title, color, description, lastUpdate, id]
        );

        return NextResponse.json({ success: true, message: 'Collection updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating collection:', error);
        return NextResponse.json({ error: 'An error occurred while updating the collection' }, { status: 500 });
    }
}