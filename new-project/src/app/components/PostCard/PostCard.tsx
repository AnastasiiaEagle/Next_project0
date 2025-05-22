import { useEffect } from 'react';
import Link from 'next/link';

type CardProps = {
    id: string,
    title: string,
    content: string,

    onDelete: (id: string) => void
}

export default function Card ({id, title, content, onDelete}:CardProps){


    return(
        <div key={id} className="w-64 h-64 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {title}
                </h3>
                <p className="text-sm text-gray-600">
                    {content}
                </p>
            </div>

            <div className="mt-3 flex justify-between">
                <Link href={`/update/${id}`}>
                    <button
                        className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md transition"
                    >
                        Редагувати
                    </button>
                </Link>
                <button
                    className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition"
                    onClick={() => onDelete(id)}
                >
                    Видалити
                </button>
            </div>
        </div>
    )
}