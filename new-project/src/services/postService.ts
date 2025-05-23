import prisma from "@/lib/prisma";

type PostProps = {
    title: string,
    content: string
}

export async function createPost(inf: PostProps){
    return await prisma.post.create({
        data: {
            title: inf.title,
            content: inf.content
        }
    })
}

export async function getPostById(id: string){
    return await prisma.post.findUnique({
        where: {
            id
        }
    })
}

export async function getPosts(){
    return await prisma.post.findMany()
}

export async function updatePost(id: string, inf:PostProps){
    return await prisma.post.update({
        where: {
            id
        },
        data: {
            title: inf.title,
            content: inf.content
        }
    })
}

export async function deletePost(id: string){
    return await prisma.post.delete({
        where: {
            id
        }
    })
}