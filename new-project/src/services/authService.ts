import prisma from "@/lib/prisma"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"
import { hash, verify } from 'argon2';

const jwtSecret = process.env.JWT_SECRET!

type UserProps = {
    email: string
    password: string
}

export async function registerUser(body: UserProps ){
    const user = await prisma.users.create({
        data: {
            email: body.email,
            password: await hash(body.password)
        }
    })
    return auth(user.id)
}

export async function loginUser(body: UserProps) {
    const user = await prisma.users.findUnique({
        where: {
            email: body.email
        },
        select: {
            id: true,
            password: true
        }        
    })

    if(!user){
        throw console.log("Невірний логін чи пароль")
    }

    if(user.password){
        const isValidPassword = await verify(user.password, body.password);
    }else{
        throw console.log("Невірний логін чи пароль")
    }
    
    return auth(user.id)
}

export async function refresh(req: Request, res: Response) {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get("refreshToken")?.value
    if (!refreshToken) {
        return new Response(JSON.stringify({ error: "Недійсний refresh-токен" }), { status: 401 });
    }
    const decoded = jwt.verify(refreshToken, jwtSecret);

    if (typeof decoded !== 'object' || decoded === null || !('id' in decoded)) {
        return new Response(JSON.stringify({ error: "Невірний токен" }), { status: 401 });
    }

    const { id } = decoded as { id: string };

    if (!id) {
        return new Response(JSON.stringify({ error: "Невірний токен" }), { status: 401 });
    }

    const user = await prisma.users.findUnique({
        where: { id },
        select: { id: true }
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "Користувача не знайдено" }), { status: 404 });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user.id);

    (await cookieStore).set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 днів
    });

    return new Response(JSON.stringify({ accessToken }), { status: 200 });
}

const auth = async(id: string) => {
    const {accessToken, refreshToken} = generateToken(id);
    const cookieStore = cookies()

    ;(await cookieStore).set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7
    })

    return {accessToken}
}

const generateToken = (id: string) => {
    const payload = {id}
    const accessToken = jwt.sign(payload, jwtSecret, {expiresIn: '5m'})
    const refreshToken = jwt.sign(payload, jwtSecret, {expiresIn: '1h'})

    return{
        accessToken,
        refreshToken
    }
}