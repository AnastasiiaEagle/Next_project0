import prisma from "@/lib/prisma";

export async function createPost(title: string, content: string){
    return await prisma.post.create({
        data: {
            title,
            content
        }
    })
}