import { NextResponse } from "next/server";
import { registerUser } from "../../../services/authService";
import { createPost } from "@/services/createPostService";

export async function POST(req: Request) {
    try {
        const text = await req.text();

        const body = await JSON.parse(text)
        const {title, content} = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Імʼя та email обовʼязкові' }, { status: 400 });
        }

        const user = await createPost(title, content)
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає користувачів'}, {status: 500})
    }
}