import prisma from "@/lib/prisma";

export async function registerUser(email: string, password: string){
    return await prisma.users.create({
        data: {
            email,
            password
        }
    })
}