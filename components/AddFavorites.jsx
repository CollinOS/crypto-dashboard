import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { CiStar } from 'react-icons/ci'


// add params or something?   ({ params })
export default function AddFavorites() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [coin, setCoin] = useState(null)

  async function updateFavorites({ coin }) {
    try {
      const updates = {
        userId: user.id,
        coin,
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
      <div>
        <input
          id="coin"
          type="text"
          value={coin || ''}
          onChange={(e) => setCoin(e.target.value)}
          className='w-12'
        />
      </div>
      <div>
        <CiStar
          onClick={() => updateFavorites({ coin })}
        >
          Update
        </CiStar>
      </div>
    </div>
  )
}