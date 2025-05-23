
type postData = {
    title: string,
    content: string
}
export const createPost = async(postData: postData) =>{
    try {
        const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: postData.title,
            content: postData.content,
        }),
        });

        if (!res.ok) {
            throw new Error(`Помилка запиту: ${res.status}`);
        }

        return res.json()
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const getPosts = async() =>{
    try {
        const res = await fetch('/api/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        if (!res.ok) {
            throw new Error(`Помилка запиту: ${res.status}`);
        }

        return res.json()
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const getPostById = async(id: string) =>{
    try {
        const res = await fetch(`/api/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        if (!res.ok) {
            throw new Error(`Помилка запиту: ${res.status}`);
        }

        return res.json()
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const updatePost = async(id: string, postData: postData) =>{
    try {
        const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: postData.title,
            content: postData.content,
        }),
        });
        if (!res.ok) {
            throw new Error(`Помилка запиту: ${res.status}`);
        }

        return res.json()
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}

export const deletePost = async(id: string) =>{
    try {
        const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
        });
        if (!res.ok) {
            throw new Error(`Помилка запиту: ${res.status}`);
        }

        return res.json()
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}