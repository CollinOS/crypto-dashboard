//import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function AddFavorites({ data }) {
  const supabase = useSupabaseClient()
  const user = useUser()

  async function updateFavorites() {
    try {
      const updates = {
        userId: user.id,
        coin: data.id,
        name: data.name,
        image: data.image,
      }

      let { error } = await supabase.from('favorites').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    }
  }

  return (
    <div>
      {/* {coin != data.id ? (
        <AiOutlineStar onClick={() => updateFavorites()} className='text-secondary text-lg hover:text-primary active:text-purple duration-100' />
      ) : (
        <AiFillStar onClick={() => updateFavorites()} className='text-purple text-lg' />
      )} */}
      <AiOutlineStar onClick={() => updateFavorites()} className='text-secondary text-lg hover:text-primary active:text-purple duration-100' />
    </div>
  )
}