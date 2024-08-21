export interface User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    phone_number: string;
    description: string;
    is_admin: boolean;
}
