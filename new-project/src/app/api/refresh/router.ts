import { NextResponse } from "next/server";
import { refreshUser } from "@/lib/fetch/auth";

export async function POST() {
    try {
        const user = await refreshUser()
        return NextResponse.json(user, {status: 201})
    } catch (error) {
        console.log('Помилка: ', error)
        return NextResponse.json({error: 'Немає користувачів'}, {status: 500})
    }
}