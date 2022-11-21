import React from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import PortfolioCoins from '../../components/PortfolioCoins';

export default function Index() {
  const user = useUser();

  return (
    <main>
      <div className="page-center">
        <div className="flex items-center justify-center flex-col py-12">
          <h2 className="pb-2 tracking-wide">Portfolio</h2>
          <p className="text-secondary text-sm">Here are the coins you have added to your portfolio. Click on a coin to manage trades!</p>
        </div>
        {!user
          ? <p>Please sign in to view your portfolio</p>
          : <PortfolioCoins />}
      </div>
    </main>
  );
}
