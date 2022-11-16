/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddFavorites from './AddFavorites';
// import { createClient } from '@supabase/supabase-js';

// export async function getStaticProps() {
//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL || '',
//     process.env.SUPABASE_SERVICE_ROLE_KEY || ''
//   )

//   const { data } = await supabaseAdmin.from('favorites').select('*').order('id')
//   return {
//     props: {
//       favorites: data,
//     },
//   }
// }

// export default function FavoriteCoins({favorites}) {
//   return (
//     <main>
//       <div className='page-center'>
//         {favorites.map((favorite) => (
//           <div key={favorite.id} favorite={favorite}>
//             <p>{favorite.coin}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   )
// }

// TO MAP THROUGH FAVORITES ^^^

function FavoritesList({ coins }) {
  const [search, setSearch] = useState('');

  return (
    <div className='page-center'>
      <div className='flex flex-row justify-between w-3/4'>
        <h4 className='py-2 my-12'>Cryptocurrency Prices by Market Cap</h4>
        <input className='border border-dark-border bg-dark p-2 w-60 rounded-lg my-14 text-secondary text-sm duration-100 active:border-purple focus:outline-none '
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          placeholder="Search"
        />
      </div>

      <table className='table-fixed w-3/4 text-sm'>
        <thead>
          <tr>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary w-16'>#</td>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary'>Coin</td>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary w-32 text-right'>Price (USD)</td>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary w-24 text-right'>24h</td>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary w-48 text-right'>24h Volume</td>
            <td className='border-b border-dark-border font-bold px-4 py-4 text-primary w-48 text-right'>Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((coin) => (search.toUpperCase() === ''
              ? coin
              // need to make sure you are filtering for a string
              : coin.name.toUpperCase().includes(search)))
            .map((coin) => (
              <tr key={coin.market_cap_rank} className='rounded-lg duration-100 hover:bg-dark-hov'>
                <td><AddFavorites /></td>
                <td className='border-b border-dark-border px-4 py-4 text-primary font-medium w-20'>{coin.market_cap_rank}</td>
                <td className='border-b border-dark-border px-4 py-4'>
                  <Link href={`/coins/${coin.id}`}>
                    <div className='flex'>
                      <div className='flex-col'>
                        <Image src={coin.image} width={20} height={20} alt="coin logo" />
                      </div>
                      <div className='mx-3 flex-auto'>
                        <span className='mr-3 text-primary font-bold'>{coin.name}</span>
                        <span className='text-secondary text-sm'>{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='border-b border-dark-border px-4 py-4 text-primary font-medium text-right'>${coin.current_price.toLocaleString()}</td>
                <td className={coin.price_change_percentage_24h.toFixed(2) > 0 ? 'text-[#00e5c3] border-b border-dark-border px-4 py-4 text-right' : 'text-orange border-b border-dark-border px-4 py-4 text-right'}>{coin.price_change_percentage_24h.toFixed(1)}%</td>
                <td className='border-b border-dark-border px-4 py-4 text-primary font-medium text-right'>${coin.total_volume.toLocaleString()}</td>
                <td className='border-b border-dark-border px-4 py-4 text-primaryfont-medium text-right'>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritesList;