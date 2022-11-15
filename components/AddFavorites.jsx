//import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { CiStar } from 'react-icons/ci'

export default function AddFavorites({ data }) {
  const supabase = useSupabaseClient()
  const user = useUser()

  async function updateFavorites() {
    try {
      const updates = {
        userId: user.id,
        coin: data.id
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
        <CiStar onClick={() => updateFavorites()} />
    </div>
  )
}