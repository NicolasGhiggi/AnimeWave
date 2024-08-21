export interface Episode {
    id?: number;
    video: string;
    image: string;
    title: string;
    series_id: number;
    release_date: string;
    episode_number: number;
    categories?: string[];
}