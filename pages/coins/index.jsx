import React from 'react';
import useApi from '../../api/useApi';
import CoinList from '../../components/CoinList';

function Index() {
  const { coins, error } = useApi('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d%2C1y');
  return (
    <main>
      <div>
        {error && <div>{error}</div>}
        {coins && <CoinList coins={coins} />}
      </div>
    </main>
  );
}

export default Index;
