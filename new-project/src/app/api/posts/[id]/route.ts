import { NextResponse } from "next/server";
import { createPost, deletePost, getPostById, updatePost } from "@/services/postService";

export async function GET(
        { params }: { params: { id: string } }
    ) {
    try {
        const id = (await params).id

        if (!id) {
            return NextResponse.json({ error: 'Id обовʼязковий' }, { status: 400 });
        }

        const user = await getPostById(id)
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає id'}, {status: 500})
    }
}

export async function PATCH(req: Request,
        { params }: { params: { id: string } }
    ) {
    try {
        const id = (await params).id

        const text = await req.text();

        const body = await JSON.parse(text)
        const {title, content} = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Назва та контент обовʼязкові' }, { status: 400 });
        }

        if (!id) {
            return NextResponse.json({ error: 'Id обовʼязковий' }, { status: 400 });
        }

        const user = await updatePost(id, {title, content})
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає id або вмісту'}, {status: 500})
    }
}

export async function DELETE(req: Request,
        { params }: { params: { id: string } }
    ) {
    try {
        const id = (await params).id

        if (!id) {
            return NextResponse.json({ error: 'Id обовʼязковий' }, { status: 400 });
        }

        const user = await deletePost(id)
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає id або вмісту'}, {status: 500})
    }
}