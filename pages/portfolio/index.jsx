import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function FavoriteCoins() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // GETS FAVORITES FROM DB UNLESS THEY ALREADY EXIST IN LOCAL STORAGE
  useEffect(() => {
    async function getFavorites() {
      try {
        if ('MY_FAVORITE_COINS' in localStorage) {
          const store = window.localStorage.getItem('MY_FAVORITE_COINS')
          setFavorites(JSON.parse(store))
        }
        else {
          setLoading(true);
          const { data, error } = await supabase
            .from("favorites")
            .select("*")
            .eq('userId', user.id)
    
          if (error) throw error;
          if (data != null) {
            setFavorites(data);
            window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(data))
          }
        }
      } catch (error) {    
      } finally {
        setLoading(false);
      }
    }
    if (user) getFavorites()
  }, [user, supabase]);

  // LOADING
  if(loading){return(<p>Loading...</p>)}

  return (
    <main>
      <div className='page-center'>
        <div className='flex items-center justify-center flex-col py-12'>
          <h2 className='pb-2 tracking-wide'>Portfolio</h2>
          <p className='text-secondary text-sm'>Here are the coins you have added to your portfolio. Click on a coin to manage trades!</p>
        </div>
        {!user ? (
          <p>Please sign in to view your portfolio</p>
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