import Image from 'next/image';
import React from 'react';
// import AddFavorites from "../../../components/AddFavorites";
import DOMPurify from 'isomorphic-dompurify';

export default function Coin({ coin }) {
  return (
    <main>
      <div className="page-center pt-14">
        <div className="w-11/12 lg:w-3/4 bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px]">
          <div className="bg-dark rounded-lg p-8">
            <p className="w-fit bg-dark-hov text-sm p-2 rounded-lg">
              Rank #
              {' '}
              <span className="text-purple">{coin.market_cap_rank}</span>
            </p>
            <div className="p-2" />
            <div className="flex flex-row items-center">
              {coin.image ? <Image src={coin.image.small} width={28} height={28} alt="" /> : null}
              <h4 className="px-2">{coin.name}</h4>
              {coin.symbol ? (
                <h4>
                  (
                  {coin.symbol.toUpperCase()}
                  )
                </h4>
              ) : null}
            </div>
            <div className="p-2" />
            <div className="flex flex-row items-center">
              {coin.market_data?.current_price
                ? (
                  <h3>
                    $
                    {coin.market_data.current_price.usd.toLocaleString()}
                  </h3>
                )
                : null}
              {coin.market_data?.price_change_percentage_24h_in_currency
                ? (
                  <p className={coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'text-green text-lg pl-2' : 'text-red text-lg pl-2'}>
                    {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}
                    %
                  </p>
                )
                : null}
            </div>

            <div className="p-2" />
            {/* <AddFavorites data={coin}/>  NEED TO FIND A WAY TO MAKE THIS WORK */}
            <div className="p-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">Market Cap</p>
                {coin.market_data?.market_cap ? (
                  <span className="text-primary">
                    $
                    {coin.market_data.market_cap.usd.toLocaleString()}
                  </span>
                ) : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">Circulating Supply</p>
                {coin.market_data ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">24 Hour High</p>
                {coin.market_data?.low_24h ? (
                  <p>
                    $
                    {coin.market_data.high_24h.usd.toLocaleString()}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">24 Hour Low</p>
                {coin.market_data?.low_24h ? (
                  <p>
                    $
                    {coin.market_data.low_24h.usd.toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="p-6" />

            <div className="grid grid-cols-3 sm:grid-cols-6 grid-rows-2 gap-4 text-center">
              <p className="text-secondary text-md hidden sm:table-cell">1h</p>
              <p className="text-secondary text-md">24h</p>
              <p className="text-secondary text-md">7d</p>
              <p className="text-secondary text-md hidden sm:table-cell">14d</p>
              <p className="text-secondary text-md">30d</p>
              <p className="text-secondary text-md hidden sm:table-cell">1y</p>
              {coin.market_data?.price_change_percentage_1h_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'text-green text-sm hidden sm:table-cell' : 'text-red text-sm hidden sm:table-cell'}>
                  {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_24h_in_currency.usd > 0 ? 'text-green text-sm' : 'text-red text-sm'}>
                  {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
              {coin.market_data?.price_change_percentage_7d_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_7d_in_currency.usd > 0 ? 'text-green text-sm' : 'text-red text-sm'}>
                  {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
              {coin.market_data?.price_change_percentage_14d_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_14d_in_currency.usd > 0 ? 'text-green text-sm hidden sm:table-cell' : 'text-red text-sm hidden sm:table-cell'}>
                  {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
              {coin.market_data?.price_change_percentage_30d_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_30d_in_currency.usd > 0 ? 'text-green text-sm' : 'text-red text-sm'}>
                  {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
              {coin.market_data?.price_change_percentage_1y_in_currency.usd ? (
                <p className={coin.market_data.price_change_percentage_1y_in_currency.usd > 0 ? 'text-green text-sm hidden sm:table-cell' : 'text-red text-sm hidden sm:table-cell'}>
                  {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}
                  %
                </p>
              ) : 'N/A'}
            </div>

            <div className="p-6" />

            <p
              className="text-secondary text-sm"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(coin.description.en ? coin.description.en : 'No description has been added for this coin.'),
              }}
            />

          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  const data = await req.json();

  return {
    props: { coin: data },
  };
}
