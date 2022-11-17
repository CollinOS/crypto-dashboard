import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function AddFavorites({ data }) {
  const supabase = useSupabaseClient();
  const user = useUser();
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
    if (user) getFavorites();
  }, [user, supabase]);

  // ADDS FAVORITE TO DB AND LOCAL STORAGE
  async function addFavorites() {
    try {
      if (!user) alert('Sign In or Create an Account to add coins to your portfolio!')
      const insertData = {
        userId: user.id,
        coin: data.id,
        name: data.name,
        image: data.image,
      }
      let { error } = await supabase.from('favorites').insert(insertData)
      const store = JSON.parse(window.localStorage.getItem('MY_FAVORITE_COINS'))
      window.localStorage.setItem('MY_FAVORITE_COINS', store, JSON.stringify(insertData))
      if (error) throw error
    } catch (error) {
      alert('Error adding that favorite.')
    }
  }

  // DELETES FAVORITE FROM DB AND LOCAL STORAGE
  async function deleteFavorites() {
    try {
      const deleteData = { data }
      //let { error } = await supabase.from('favorites').delete(deleteData).eq('coin', data.id, 'userId', user.id)
      const store = JSON.parse(window.localStorage.getItem('MY_FAVORITE_COINS'))
      if (store.id = data.id) console.log(store.id)//window.localStorage.removeItem('MY_FAVORITE_COINS', store.indexOf(data.id))
      if (error) throw error
    } catch (error) {
      alert('Error deleting that favorite.')
    }
  }
  
  // LOADING
  if (loading) {return ('Loading...')}

  return (
    <div>
      {favorites.find(favorite => favorite.coin === data.id) !== undefined
        ? <AiFillStar onClick={() => {deleteFavorites()}} className='text-orange text-lg hover:text-secondary duration-100' />
        : <AiOutlineStar onClick={() => {addFavorites()}} className='text-secondary text-lg hover:text-primary active:text-orange duration-100' />
      }
    </div>
  )
}