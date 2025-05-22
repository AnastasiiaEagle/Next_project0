import { NextResponse } from "next/server";
import { registerUser } from "../../../services/authService";

export async function POST(req: Request) {
    try {
        const text = await req.text();
        console.log('Отримане тіло (text):', text);

        const body = await JSON.parse(text)
        const {name, email} = body

        if (!name || !email) {
            return NextResponse.json({ error: 'Імʼя та email обовʼязкові' }, { status: 400 });
        }

        const user = await registerUser(name, email)
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає користувачів'}, {status: 500})
    }
}