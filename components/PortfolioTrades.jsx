import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
// import Loading from './Loading';

const PortfolioTrades = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [trades, setTrades] = useState([]);
  const [portAmount, setPortAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  // FORM FIELDS
  const [coinName, setCoinName] = useState('')
  const [coinPrice, setCoinPrice] = useState('')
  const [coinAmount, setCoinAmount] = useState('')
  const [buy, setBuy] = useState(true)
  const [sell, setSell] = useState(false)
  const [change, setChange] = useState(false)
  const [formError, setFormError] = useState(null)

  // GETS TRADES FROM DB UNLESS THEY ALREADY EXIST IN LOCAL STORAGE
  useEffect(() => {
    async function getTrades() {
      try {
        // setLoading(true);
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
      } 
      // finally {
      //   setLoading(false);
      // }
    }
    if (user) getTrades();
  }, [user, supabase, change]);

  // GET PORTFOLIO AMOUNT EACH TIME TRADES CHANGES, GETS BUYS AND SELLS THEN FINDS TOTAL
  useEffect(() => {
    function getTotal() {
      const buys = trades.map((trade) => trade.buy ? trade.coin_price_usd*trade.amount_of_coins : 0)
      const sells = trades.map((trade) => trade.sell ? trade.coin_price_usd*trade.amount_of_coins : 0)
      const buyTotal = buys.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const sellTotal = sells.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const total = buyTotal - sellTotal
      setPortAmount(total.toLocaleString())
    }
    if (trades) getTotal();
  }, [trades]);

  async function addTrade() {
    try {
      const insertData = {
        userId: user.id,
        coin: coinName,
        coin_price_usd: coinPrice,
        amount_of_coins: coinAmount,
        buy: buy,
        sell: sell
      };

      const { error } = await supabase.from('trades').insert(insertData);
      if (error) throw error;
      console.log('trade add success')
    } catch (error) {
      console.log(error)
    } finally {
      change === false ? setChange(true) : setChange(false)
    }
  }

  const handleBuy = () => {
    setSell(false)
    setBuy(true)
  }
  const handleSell = () => {
    setSell(true)
    setBuy(false)
  }

  // LOADING
  // if (loading) { return (<Loading />); }

  return (
    <div className="w-3/4 bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px]">
      <div className="bg-dark rounded-lg p-8">
        <p className='text-lg text-secondary'>Portfolio</p>
        <p className='text-xl'>${portAmount}</p>
        <div className='p-6' />
        
        {/*       TRADE FORM       */}

        <div className='flex'>
          <div className="flex-col">
            <div>
              <label htmlFor="coinName"></label>
              <input 
                className='w-96'
                type="text" 
                id="coinName" 
                value={coinName}
                placeholder='Coin'
                onChange={(e) => setCoinName(e.target.value)}
              />
            </div>
            <div className='p-1'/>
            <div>
              <label htmlFor="coinPrice"></label>
              <input 
                className='w-96'
                type="number" 
                id="coinPrice" 
                value={coinPrice}
                placeholder='Coin Price'
                onChange={(e) => setCoinPrice(e.target.value)}
              />
            </div>
            <div className='p-1'/>
            <div>
              <label htmlFor="coinAmount"></label>
              <input 
                className='w-96'
                type="number" 
                id="coinAmount" 
                value={coinAmount}
                placeholder='# of coins'
                onChange={(e) => setCoinAmount(e.target.value)}
              />
            </div>
            <div className='p-1'/>
            <div className='pl-1'>
              <input className='accent-purple'
                type="radio" 
                id="buy" 
                value="buy" 
                checked={buy === true} 
                onChange={handleBuy} />
              <label htmlFor="buy">Buy</label>
              <div className='p-1'/>
              <input className='accent-purple'
                type="radio" 
                id="sell"
                value="sell" 
                checked={sell === true}
                onChange={handleSell} />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='p-1'/>
            <button
              onClick={() => addTrade()}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Submit'}
            </button>

            {formError && <p className='text-red'>{formError}</p>}
          </div>
          <div className='flex-col'>
            <p className='border-b-2 text-md text-secondary border-purple'>test</p>
            {trades
            .map((trade) => (
              <div key={trade.id} trade={trade}>
                <div className="grid grid-cols-6 gap-4 text-right">
                  <p className="text-sm">{trade.coin}</p>
                  <p className="text-sm">{trade.amount_of_coins}</p>
                  <p className="text-sm">{trade.coin_price_usd}</p>
                  <p>{trade.buy == true ? 'buy' : 'sell'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioTrades