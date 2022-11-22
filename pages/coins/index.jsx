import React from 'react';
import CoinList from '../../components/CoinList';

function Index({ coins }) {
  return (
    <main>
      <div>
        {coins && <CoinList coins={coins} />}
      </div>
    </main>
  );
}

export default Index;

export async function getServerSideProps() {
  const req = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d%2C1y');
  const data = await req.json();

  return {
    props: { coins: data },
  };
}
