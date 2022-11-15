import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin.from('favorites').select('*').order('id')
  return {
    props: {
      favorites: data,
    },
  }
}

export default function FavoriteCoins({favorites}) {
  return (
    <main>
      <div className='page-center'>
        {favorites.map((favorite) => (
          <div key={favorite.id} favorite={favorite}>
            <p>{favorite.coin}</p>
          </div>
        ))}
      </div>
    </main>
  )
}