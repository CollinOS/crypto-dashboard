import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function AddFavorites({ data, session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getFavorites() {
      try {
        if ('MY_FAVORITE_COINS' in localStorage) {
          const store = window.localStorage.getItem('MY_FAVORITE_COINS')
          setFavorites(JSON.parse(store))
          console.log('setFavorites with localStorage')
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
            console.log('setFavorites with supabase')
            window.localStorage.setItem('MY_FAVORITE_COINS', JSON.stringify(data))
            console.log('set localStorage')
          }
        }
      } catch (error) {
        // alert(error.message + ' getFavorites');     
      } finally {
        setLoading(false);
      }
    }
    if (user) getFavorites()
  }, [user, supabase]);

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
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data! addFavorites')
    }
  }

  async function deleteFavorites() {
    try {
      const deleteData = { data }
      let { error } = await supabase.from('favorites').delete(deleteData).eq('coin', data.id, 'userId', user.id)
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data! deleteFavorites')
    }
  }

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