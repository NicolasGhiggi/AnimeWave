// app/api/user/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { User } from '@/interfaces/User';
import crypto from 'crypto';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const hashedPassword = searchParams.get('password');

        if (!email || !hashedPassword) {
            return returnNull(400); // Bad Request
        }

        // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const results = await query(
            `SELECT id, username, name, surname, email, phone_number, description, is_admin 
             FROM users 
             WHERE email = ? AND password = ?`,
            [email, hashedPassword]
        );

        if (results.length === 0) return returnNull(404);
        if (results.length > 1) return returnNull(500);

        const user = results[0];

        const userData: User = {
            id: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            phone_number: user.phone_number,
            description: user.description,
            is_admin: user.is_admin
        };

        const response = NextResponse.json({ userData });
        response.cookies.set('user_data', JSON.stringify(userData), { path: '/', maxAge: 86400 });
        return response;
    } catch (error) {
        console.error('Error handling request:', error);
        return returnNull(500);
    }
}

function returnNull(status: number) {
    const response = NextResponse.json({ userData: null }, { status });
    response.cookies.set('user_data', '', { path: '/', maxAge: 86400 });
    return response;
}

export async function POST(req: Request) {
    try {
        const { username, name, surname, email, password, confirmPassword, phoneNumber, description } = await req.json();

        if (!username || !name || !surname || !email || !password || !phoneNumber || !description) {
            return NextResponse.json({ error: 'Not all fields are filled.', success: false }, { status: 400 });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Email invalid.', success: false }, { status: 400 });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return NextResponse.json({ error: 'Password invalid. Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.', success: false }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match.', success: false }, { status: 400 });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const checkUsername = await query(`SELECT * FROM users WHERE username = ?`, [username]);
        if (checkUsername.length > 0) {
            return NextResponse.json({ error: 'Username already registered.', success: false }, { status: 400 });
        }

        const checkEmail = await query(`SELECT * FROM users WHERE email = ?`, [email]);
        if (checkEmail.length > 0) {
            return NextResponse.json({ error: 'Email already registered.', success: false }, { status: 400 });
        }

        const insertResult = await query(
            `INSERT INTO users (username, name, surname, email, password, phone_number, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [username, name, surname, email, hashedPassword, phoneNumber, description]
        );

        return NextResponse.json({ success: true, message: 'User registered successfully.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error.', success: false }, { status: 500 });
    }
}
