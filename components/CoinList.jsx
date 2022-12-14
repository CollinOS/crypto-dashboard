import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddFavorites from './AddFavorites';
// import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'
// import { AiOutlineSearch } from 'react-icons/ai'

function CoinList({ coins }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');

  const isAscending = () => {
    sort === 'asc'
      ? coins.sort((a, b) => (a.market_cap_rank > b.market_cap_rank ? 1 : -1))
      : coins.sort((a, b) => (a.market_cap_rank < b.market_cap_rank ? 1 : -1));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearch(event.target.value.toUpperCase());
    }
  };

  return (
    <div className="page-center px-5 sm:px-0">
      <div className="flex flex-col md:flex-row items-center text-center md:justify-between w-full 2xl:w-3/4">
        {/*    HEADER AND SEARCH    */}
        <h4 className=" pt-8 md:pt-0 md:py-2 md:my-12">Cryptocurrency Prices by Market Cap</h4>
        <input
          className="border border-dark-border bg-dark p-2 h-[38px] w-60 rounded-lg my-6 md:my-14 text-secondary text-sm duration-100 active:border-purple focus:outline-none "
          onKeyPress={handleKeyPress}
          placeholder="Search"
        />
      </div>

      <table className="table-fixed w-full 2xl:w-3/4 text-sm">
        <thead>
          {/*    COLUMN LABELS    */}
          <tr>
            <td className="border-b border-dark-border font-bold px-4 sm:px-4 py-4 text-primary w-4" />
            { sort === 'asc'
              ? <td className="border-b border-dark-border font-bold px-1 sm:px-4 py-4 text-primary w-8 sm:w-12 cursor-pointer" onClick={() => { setSort('desc'); isAscending(); }}>#</td>
              : <td className="border-b border-dark-border font-bold px-1 sm:px-4 py-4 text-primary w-8 sm:w-12 cursor-pointer" onClick={() => { setSort('asc'); isAscending(); }}>#</td>}
            <td className="border-b border-dark-border font-bold px-1 sm:px-4 py-4 text-primary">Coin</td>
            <td className="border-b border-dark-border font-bold px-1 sm:px-4 py-4 text-primary w-32 text-right">Price (USD)</td>
            <td className="border-b border-dark-border font-bold px-1 sm:px-4 py-4 text-primary w-20 text-right">24h</td>
            <td className="border-b hidden lg:table-cell border-dark-border font-bold px-1 sm:px-4 py-4 text-primary w-40 text-right">24h Volume</td>
            <td className="border-b hidden md:table-cell border-dark-border font-bold px-1 sm:px-4 py-4 text-primary text-right w-40">Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {/*    COIN ROWS   */}
          {coins
            .filter((coin) => (search.toUpperCase() === ''
              ? coin
              : coin.name.toUpperCase().includes(search)))
            .map((coin) => (
              <tr key={coin.market_cap_rank} className="rounded-lg duration-100 hover:bg-dark-hov">
                <td className="border-b border-dark-border px-1 sm:px-4 py-4 text-primary font-medium w-8">
                  <AddFavorites coin={coin} />
                </td>
                <td className="border-b border-dark-border sm:px-4 py-4 text-primary font-medium w-20">{coin.market_cap_rank}</td>
                <td className="border-b border-dark-border sm:pl-4 py-4">
                  <Link href={`/coins/${coin.id}`}>
                    <div className="flex">
                      <div className="flex-col self-center">
                        <Image src={coin.image} width={20} height={20} alt="coin logo" className="rounded-full hidden sm:table-cell" />
                      </div>
                      <div className="ml-3 flex-auto">
                        <span className="mr-3 text-primary font-bold">{coin.name}</span>
                        <span className="text-secondary text-sm flex lg:inline-flex">{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="border-b border-dark-border px-1 sm:px-4 py-4 text-primary font-medium text-right">
                  $
                  {coin.current_price.toLocaleString()}
                </td>
                <td className={coin.price_change_percentage_24h.toFixed(2) > 0 ? 'text-green border-b border-dark-border px-1 sm:px-4 py-4 text-right' : 'text-red border-b border-dark-border px-1 sm:px-4 py-4 text-right'}>
                  {coin.price_change_percentage_24h.toFixed(1)}
                  %
                </td>
                <td className="border-b hidden lg:table-cell border-dark-border px-1 sm:px-4 py-4 text-primary font-medium text-right">
                  $
                  {coin.total_volume.toLocaleString()}
                </td>
                <td className="border-b hidden md:table-cell border-dark-border px-1 sm:px-4 py-4 text-primary font-medium text-right">
                  $
                  {coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinList;
