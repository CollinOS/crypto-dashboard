import { useState } from 'react'
import Image from 'next/image'
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
        <div className='flex items-center justify-center flex-col py-12'>
          <h2 className='pb-2 tracking-wide'>Portfolio</h2>
          <p className='text-secondary text-sm'>Here are the coins you have added to your portfolio. Click on a coin to manage trades!</p>
        </div>
        <div className='flex flex-row flex-wrap w-4/5 items-center justify-center'>
          {favorites.map((favorite) => (
            <div key={favorite.id} favorite={favorite} className='bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px] m-4'>
              <div className='bg-dark rounded-lg flex items-center justify-center p-4'>
                <Image src={favorite.image} width={50} height={50} alt="coin logo" className='rounded-full' />
                <h3 className='ml-2'>{favorite.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}