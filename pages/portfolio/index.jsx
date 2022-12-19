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
          ? <>
              <div className="blur-sm flex items-center justify-center w-[100%]">
                <PortfolioTrades />
              </div>
              <h3 className='absolute text-center'>Please sign in or create an account to view your portfolio page</h3>
            </>
          : (
            <>
              <PortfolioTrades />
              <PortfolioCoins />
            </>
          )}
      </div>
    </main>
  );
}
