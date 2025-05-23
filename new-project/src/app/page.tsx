'use client'

import Card from "@/components/PostCard/PostCard";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { CardInt } from "../../types/CardInt";
import { deletePost, getPosts } from "../lib/fetch/create";
import { useRouter } from "next/navigation";
import { refreshUser } from "@/lib/fetch/auth";


export default function Home() {
  const [cards, setCards] = useState<CardInt[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();


  function isAccessTokenValid(token: string): boolean {
      try {
          const decoded: { exp: number } = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decoded.exp > currentTime;
      } catch (error) {
          return false;
      }
  }

  const tokenSearch = async()=>{
        const token = Cookies.get('refreshToken');
        const localToken = localStorage.getItem('accessToken');
        
        if(!token && !localToken){
            console.log('Токен не знайдений');
            router.push('/auth');
        }else if(localToken !== null){
        if(!isAccessTokenValid(localToken)){
            const res = refreshUser()
        }
        }
    }
 useEffect(() => {
        tokenSearch()
    }, []);

  const selectPost = async () =>{
    setLoading(true)
    const res = await getPosts()
    setLoading(false)
    setCards(res)
  }

  const handleDelete = async (id: string) => {
    const res = await deletePost(id)
    console.log(res)
    if (res) {
      setCards((card) => card.filter((msg) => msg.id !== id));
      } else {
        console.error('Не вдалося видалити повідомлення');
      }
  }

  useEffect(()=>{
    selectPost()
  },[])
  return (
    <>
    {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-5">
          {
            Array.isArray(cards) ? cards.map((p) => (
              <Card key={p.id}
               id={p.id}
               title={p.title}
               content={p.content}
               onDelete={(id)=>{
                handleDelete(id).catch(console.error)
              }}/>
            )) : "Список порожній"
          }
        </ul>
      )
    }
    </>
  );
}
