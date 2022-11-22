import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import PortfolioCoins from '../../components/PortfolioCoins';
import PortfolioTrades from '../../components/PortfolioTrades';

export default function Index() {
  const user = useUser();

  return (
    <main>
      <div className="page-center pt-14">
        {!user
          ? <p>Please sign in to view your portfolio</p>
          : <><PortfolioTrades />
            <PortfolioCoins /></>}
      </div>
    </main>
  );
}
