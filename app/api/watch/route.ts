import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Funzione principale per gestire la richiesta GET
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const seriesId = searchParams.get('seriesId');
    const userId = searchParams.get('userId');

    if (!seriesId) {
        return NextResponse.json({ error: 'Missing series ID' }, { status: 400 });
    }

    try {
        const seriesInfo = await getSeriesInfo(seriesId);
        if (!seriesInfo) {
            return NextResponse.json({ error: 'Series not found' }, { status: 404 });
        }

        const categories = await getSeriesCategories(seriesId);
        const video_list = await getSeriesVideos(seriesId);
        const is_favorite = await checkIfFavorite(seriesId, userId);

        if (userId) {
            await updateHistory(parseInt(seriesId), parseInt(userId));
        }

        const seriesResponse = {
            ...seriesInfo,
            is_favorite,
            categories,
            video_list
        };

        return NextResponse.json(seriesResponse);

    } catch (error) {
        console.error('Error retrieving series:', error);
        return NextResponse.json({ error: 'Error retrieving series' }, { status: 500 });
    }
}

// Funzione per ottenere le informazioni della serie
const getSeriesInfo = async (seriesId: string) => {
    const [series] = await query(`
        SELECT 
            series.id, 
            series.title, 
            series.alternative_title, 
            series.image_src, 
            studios.name AS studio, 
            types.name AS type, 
            series.release_date, 
            series.description 
        FROM series
        JOIN studios ON series.studio_id = studios.id
        JOIN types ON series.type_name = types.name
        WHERE series.id = ?
    `, [seriesId]);

    return series ? {
        id: series.id,
        title: series.title,
        alternative_title: series.alternative_title,
        image: series.image_src,
        studio: series.studio,
        type: series.type,
        release_year: new Date(series.release_date).getFullYear(),
        description: series.description
    } : null;
};

// Funzione per ottenere le categorie della serie
const getSeriesCategories = async (seriesId: string) => {
    const categories = await query(`
        SELECT genre_name
        FROM series_has_genres
        WHERE series_id = ?
    `, [seriesId]);

    return categories.map((category: any) => category.genre_name);
};

// Funzione per ottenere la lista dei video della serie
const getSeriesVideos = async (seriesId: string) => {
    const videos = await query(`
        SELECT video_src
        FROM episodes
        WHERE series_id = ?
    `, [seriesId]);

    return videos.map((video: any) => video.video_src);
};

// Funzione per controllare se la serie è nei preferiti dell'utente
const checkIfFavorite = async (seriesId: string, userId: string | null) => {
    if (!userId) return false;

    const [favorite] = await query(`
        SELECT 1
        FROM favorite
        WHERE series_id = ? AND user_id = ?
    `, [seriesId, userId]);

    return !!favorite;
};

// Funzione per aggiornare la cronologia di visione
const updateHistory = async (seriesId: number, userId: number) => {
    try {
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Aggiorna la data di visione se la serie è già nella cronologia
        const updateResult = await query(`
            UPDATE history
            SET watch_date = ?
            WHERE series_id = ? AND user_id = ?
        `, [currentDate, seriesId, userId]);

        // Se non è stata aggiornata (nessuna riga influenzata), aggiungi una nuova voce
        if (updateResult.affectedRows === 0) {
            await query(`
                INSERT INTO history (series_id, user_id, watch_date)
                VALUES (?, ?, ?)
            `, [seriesId, userId, currentDate]);
        }
    } catch (error) {
        console.error('Error updating history:', error);
    }
};
