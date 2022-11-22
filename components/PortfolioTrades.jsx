import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Loading from './Loading';

const PortfolioTrades = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  // GETS TRADES FROM DB UNLESS THEY ALREADY EXIST IN LOCAL STORAGE
  useEffect(() => {
    async function getTrades() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('trades')
          .select('*')
          .eq('userId', user.id);

        if (error) throw error;
        if (data != null) {
          setTrades(data);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    if (user) getTrades();
  }, [user, supabase]);



  // LOADING
  if (loading) { return (<Loading />); }

  return (
    <div className="w-3/4 bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px]">
      <div className="bg-dark rounded-lg p-8">
        <h4>Portfolio</h4>
        <p className='text-lg'>$0.00</p>
      </div>
    </div>
  )
}

export default PortfolioTrades