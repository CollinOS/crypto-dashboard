import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import Loading from './Loading';

export default function AddFavorites({ coin }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // GETS FAVORITES FROM DB UNLESS THEY ALREADY EXIST IN LOCAL STORAGE
  useEffect(() => {
    async function getFavorites() {
      try {
        if ('MY_FAVORITE_COINS' in window.localStorage) {
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
            window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(data))
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    if (user) getFavorites();
  }, [user, supabase]);

  // ADDS FAVORITE TO DB AND LOCAL STORAGE
  async function addFavorites() {
    try {
      if (!user) alert('Sign In or Create an Account to add coins to your portfolio!');
      const insertData = {
        userId: user.id,
        coin: coin.id,
        name: coin.name,
        image: coin.image,
      };
      const { error } = await supabase.from('favorites').insert(insertData);
      // LOCAL STORAGE
      const store = JSON.parse(window.localStorage.getItem('MY_FAVORITE_COINS'));
      store.push(insertData);
      window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(store));
      setFavorites(store);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  // DELETES FAVORITE FROM DB AND LOCAL STORAGE
  async function deleteFavorites() {
    try {
      const { error } = await supabase.from('favorites').delete('*').eq('coin', coin.id).eq('userId', user.id);
      // LOCAL STORAGE
      const store = JSON.parse(window.localStorage.getItem('MY_FAVORITE_COINS'));
      const index = store.findIndex((store) => store.coin === coin.id);
      store.splice(index, 1);
      window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(store));
      setFavorites(store);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  // LOADING
  if (loading) { return (<Loading />); }

  return (
    <div>
      {favorites.find((favorite) => favorite.coin === coin.id) !== undefined
        ? <AiFillStar onClick={() => { deleteFavorites(); }} className="text-orange text-lg hover:text-secondary duration-100" />
        : <AiOutlineStar onClick={() => { addFavorites(); }} className="text-secondary text-lg hover:text-orange duration-100" />}
    </div>
  );
}
