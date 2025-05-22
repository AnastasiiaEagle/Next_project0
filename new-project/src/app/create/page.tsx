'use client'

import { useState } from "react"
import { createPost } from "../services/create";


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        
            const postData = {
                title,
                content,
            }

            try {
                const res = await createPost(postData)

                setTitle('');
                setContent('');
 
            } catch (error: any) {
                console.log(error)
                if (error.response) {
                    setError(error.response.data?.message || 'Щось пішло не так...');
                } else {
                    setError('Помилка при надсиланні');
                }
            }
    };

    return(
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Залишити відмітку</h2>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва:</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Вміст:</label>
                <textarea
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setContent(e.target.value)}
                    value={content}
                    required
                />
                </div>

                <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
                >
                {loading ? "Зачекайте..." : "Створити"}
                </button>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
        </div>
    )
}