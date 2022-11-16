import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function AddFavorites({ data }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [ favorites, setFavorites] = useState([]);
  //const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getFavorites();
  }, [])
  
  async function getFavorites() {
    try {
      const { data, error } = await supabase.from("favorites").select("*").eq('userId', user.id)
      if (error) throw error;
      if (data != null) {
        setFavorites(data);
      }
    } catch (error) {
      alert(error.message + 'getFavorites');
    }
  }

  async function addFavorites() {
    try {
      const updates = {
        userId: user.id,
        coin: data.id,
        name: data.name,
        image: data.image,
      }
      let { error } = await supabase.from('favorites').upsert(updates)
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data! addFavorites')
    }
  }

  async function deleteFavorites() {
    try {
      const updates = { data }
      let { error } = await supabase.from('favorites').delete(updates).eq('coin', data.id, 'userId', user.id)
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data! deleteFavorites')
    }
  }

  return (
    <div>
      {favorites.find(favorite => favorite.coin === data.id) !== undefined
        ? <AiFillStar onClick={() => {deleteFavorites();getFavorites()}} className='text-orange text-lg hover:text-secondary duration-100' />
        : <AiOutlineStar onClick={() => {addFavorites();getFavorites()}} className='text-secondary text-lg hover:text-primary active:text-orange duration-100' />
      }
    </div>
  )
}