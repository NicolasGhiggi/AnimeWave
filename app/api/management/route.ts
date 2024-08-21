import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
    try {
        // Esegui la query per ottenere tutte le serie
        const results = await query(`
            SELECT 
                series.id AS id, 
                series.title AS title, 
                series.alternative_title AS alternative_title, 
                studios.name AS studio, 
                types.name AS type
            FROM 
                series
                JOIN studios ON series.studio_id = studios.id
                JOIN types ON series.type_name = types.name;
        `);

        return NextResponse.json(results);
    } catch (error) {
        // Gestisci gli errori e restituisci un messaggio di errore
        console.error('Error fetching series:', error);
        return NextResponse.json({ error: 'An error occurred while fetching series.' }, { status: 500 });
    }
}