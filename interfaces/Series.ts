export interface Series {
    id: number;
    title: string;
    image: string;
    video_list: string[];
    categories: string[];
    type?: string;
    studio?: string;
    description?: string;
    is_favorite?: boolean;
    release_year?: string;
    total_episodes?: number;
    alternative_title?: string;
}