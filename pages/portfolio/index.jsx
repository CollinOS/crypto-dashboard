import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function FavoriteCoins({ session }) { //{ favorites }
  const user = useUser();
  const supabase = useSupabaseClient();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites()
  }, []);

  const fetchFavorites = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const { user } = session

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .eq("userId", user?.id);
      
      if (error) throw error;
      setFavorites(data);
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false);
    }
  };

  if(loading){return(<p>Loading...</p>)}

  return (
    <main>
      <div className='page-center'>
        <div className='flex items-center justify-center flex-col py-12'>
          <h2 className='pb-2 tracking-wide'>Portfolio</h2>
          <p className='text-secondary text-sm'>Here are the coins you have added to your portfolio. Click on a coin to manage trades!</p>
        </div>
        {!session ? (
          <p>Please log in</p>
        ) : (
        <div className='flex flex-row flex-wrap w-4/5 items-center justify-center'>
          {favorites
          .map((favorite) => (
            <div key={favorite.id} favorite={favorite} className='bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px] m-4'>
              <div className='bg-dark rounded-lg flex items-center justify-center p-4'>
                <Image src={favorite.image} width={50} height={50} alt="coin logo" className='rounded-full' />
                <h3 className='ml-2'>{favorite.name}</h3>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </main>
  )
}