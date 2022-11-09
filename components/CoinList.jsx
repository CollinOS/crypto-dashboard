/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function CoinList({ coins }) {
  const [search, setSearch] = useState('');

  return (
    <div className='page-center'>
      <div className='flex flex-row justify-between w-3/4'>
        <h4 className='py-2 my-12'>Cryptocurrency Prices by Market Cap</h4>
        <input className='bg-gray-900 p-2 w-60 rounded-lg my-12'
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          placeholder="Search"
        />
      </div>

      <table className='table-fixed w-3/4 text-sm'>
        <thead>
          <tr>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100 w-16'>#</td>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100'>Coin</td>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100 w-32 text-right'>Price (USD)</td>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100 w-24 text-right'>24h</td>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100 w-48 text-right'>24h Volume</td>
            <td className='border-b border-gray-500 font-bold px-4 py-4 text-gray-100 w-48 text-right'>Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {coins
            .filter((coin) => (search.toUpperCase() === ''
              ? coin
              // need to make sure you are filtering for a string
              : coin.name.toUpperCase().includes(search)))
            .map((coin) => (
              <tr key={coin.market_cap_rank} className='hover:bg-gray-900'>
                <td className='border-b border-gray-500 px-4 py-4 text-gray-100 font-medium w-20'>{coin.market_cap_rank}</td>
                <td className='border-b border-gray-500 px-4 py-4'>
                  <Link href={`/coins/${coin.id}`}>
                    <div className='flex'>
                      <div className='flex-col'>
                        <Image src={coin.image} width={20} height={20} alt="coin logo" />
                      </div>
                      <div className='mx-3 flex-auto'>
                        <span className='mr-3 text-gray-100 font-bold'>{coin.name}</span>
                        <span className='text-gray-400 text-sm'>{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='border-b border-gray-500 px-4 py-4 text-gray-100 font-medium text-right'>${coin.current_price.toLocaleString()}</td>
                <td className='border-b border-gray-500 px-4 py-4 text-gray-100 font-medium text-right'>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                <td className='border-b border-gray-500 px-4 py-4 text-gray-100 font-medium text-right'>${coin.total_volume.toLocaleString()}</td>
                <td className='border-b border-gray-500 px-4 py-4 text-gray-100 font-medium text-right'>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinList;
