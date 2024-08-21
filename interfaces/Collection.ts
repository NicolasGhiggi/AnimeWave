import { Series } from "@/interfaces/Series";

export interface Collection {
    id?: number;
    title: string;
    color: string;
    num_series?: number;
    description?: string;
    last_update?: string;
    has_series?: boolean;
    seriesList?: Series[];
}