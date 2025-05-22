
type postData = {
    title: string,
    content: string
}
export const createPost = async(postData: postData) =>{
    try {
        const res = fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: postData.title,
            content: postData.content,
        }),
        });
        return res
    } catch (error) {
        console.error('Unexpected error:', error);
        throw new Error('Невідома помилка');
    }
}