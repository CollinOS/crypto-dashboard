import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Loading from './Loading';
// import AddFavorites from './AddFavorites';

export default function PortfolioCoins() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // GETS FAVORITES FROM DB UNLESS THEY ALREADY EXIST IN LOCAL STORAGE
  useEffect(() => {
    async function getFavorites() {
      try {
        if ('MY_FAVORITE_COINS' in localStorage) {
          const store = window.localStorage.getItem('MY_FAVORITE_COINS');
          setFavorites(JSON.parse(store));
        } else {
          setLoading(true);
          const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('userId', user.id);

          if (error) throw error;
          if (data != null) {
            setFavorites(data);
            window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(data));
          }
        }
      } catch (error) {
        return ('There was an error');
      } finally {
        setLoading(false);
      }
    }
    if (user) getFavorites();
  }, [user, supabase]);

  // LOADING
  if (loading) { return (<Loading />); }

  return (
    <div className="flex flex-row flex-wrap w-4/5 items-center justify-center">
      {favorites
        .map((favorite) => (
          <div key={favorite.id} favorite={favorite} className="bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px] m-4">
            <div className="bg-dark rounded-lg flex items-center justify-center p-4">
              {/* <AddFavorites favorite={favorite}/> */}
              <Image src={favorite.image} width={50} height={50} alt="coin logo" className="rounded-full" />
              <h3 className="ml-2">{favorite.name}</h3>
            </div>
          </div>
        ))}
    </div>
  );
}
