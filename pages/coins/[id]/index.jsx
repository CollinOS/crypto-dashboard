import Image from "next/image";
import AddFavorites from "../../../components/AddFavorites";

export default function Coin({ coin }) {
  console.log(coin)
  return (
    <main>
      <div className='page-center'>
        <div className='w-3/4 bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px]'>
          <div className='bg-dark rounded-lg p-4'>
            <p className='w-fit bg-dark-hov text-sm p-2 rounded-lg'>Rank # <span className='text-purple'>{coin.market_cap_rank}</span></p>
            <div className="p-2" />
            <div className="flex flex-row items-center">
              {coin.image ? <Image src={coin.image.small} width={28} height={28} alt='' /> : null}
              <h4 className="px-2">{coin.name}</h4>
              {coin.symbol ? <h4>({coin.symbol.toUpperCase()})</h4> : null}
            </div>
            <div className="p-2" />
            <div className="flex flex-row items-center">
              {coin.market_data?.current_price 
                ? <h3>${coin.market_data.current_price.usd.toLocaleString()}</h3> 
                : null}
              {coin.market_data?.price_change_percentage_24h_in_currency 
                ? <p className={coin.market_data?.price_change_percentage_24h_in_currency > 0 ? 'text-[#00e5c3] text-lg pl-2' : 'text-orange text-lg pl-2'}>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> 
                : null}
            </div>

            <div className="p-2" />
            <AddFavorites data={coin}/>
            <div className="p-2" />

            <div class="grid grid-cols-2 gap-4">
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">Market Cap</p>
                {coin.market_data?.market_cap ? <span className="text-primary">${coin.market_data.market_cap.usd.toLocaleString()}</span> : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">Circulating Supply</p>
                {coin.market_data ? <p>{coin.market_data.circulating_supply.toLocaleString()}</p> : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">24 Hour High</p>
                {coin.market_data?.low_24h ? <p>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
              </div>
              <div className="flex justify-between border-b border-dark-border text-sm">
                <p className="text-secondary">24 Hour Low</p>
                {coin.market_data?.low_24h ? <p>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
              </div>
            </div>

            <div className="p-6" />

            <div class="grid grid-cols-6 grid-rows-2 gap-4 text-center">
              <p className="text-secondary text-md">1h</p>
              <p className="text-secondary text-md">24h</p>
              <p className="text-secondary text-md">7d</p>
              <p className="text-secondary text-md">14d</p>
              <p className="text-secondary text-md">30d</p>
              <p className="text-secondary text-md">1y</p>
              {coin.market_data?.price_change_percentage_1h_in_currency ? <p className={coin.market_data?.price_change_percentage_1h_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency ? <p className={coin.market_data?.price_change_percentage_24h_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency ? <p className={coin.market_data?.price_change_percentage_7d_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency ? <p className={coin.market_data?.price_change_percentage_14d_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency ? <p className={coin.market_data?.price_change_percentage_30d_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
              {coin.market_data?.price_change_percentage_24h_in_currency ? <p className={coin.market_data?.price_change_percentage_1y_in_currency > 0 ? 'text-[#00e5c3] text-sm' : 'text-orange text-sm'}>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : 'N/A'}
            </div>
            
            <div className="p-4" />
   
          </div>
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`);
  const data = await req.json();

  return {
      props: { coin: data },
  }
}