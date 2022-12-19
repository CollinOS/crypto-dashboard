import React, { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Loading from './Loading';
import { BsTrash } from 'react-icons/bs';

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
          setTrades(data.reverse());
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

  async function clearTrades() {
    try {
      const { error } = await supabase.from('trades').delete('*').eq('userId', user.id);
      alert('Trades cleared')
      if (error) throw error;
    } catch (error) {
      console.log(error);
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
    <div className="w-11/12 sm:w-3/4 bg-gradient-to-br from-purple via-dark-hov to-purple rounded-lg p-[1px]">
      <div className="bg-dark rounded-lg p-8">
        <div className='flex justify-between'>
          <div className='flex-col'>
            <p className='text-lg text-secondary'>Portfolio</p>
            <p className='text-xl'>${portAmount}</p>
          </div>
          <div className='flex-col text-right'>
            <p className='text-lg text-secondary'>Total Trades</p>
            <div className='flex justify-end items-center'>
              <BsTrash className='text-md text-secondary mr-4 duration-100 hover:text-purple cursor-pointer' onClick={clearTrades} />
              <p className='text-xl'>{trades.length}</p>
            </div>
          </div>
        </div>
        <div className='p-6' />
        
        {/*       TRADE FORM       */}

        <div className='2xl:flex 2xl:justify-between flex justify-center flex-wrap'>
          <div className="flex-col px-10 lg:px-10 2xl:px-0 pb-10 2xl:pr-10 2xl:pb-0">
            <div>
              <label htmlFor="coinName"></label>
              <input 
                className='w-[250px] sm:w-96'
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
                className='w-[250px] sm:w-96'
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
                className='w-[250px] sm:w-96'
                type="number" 
                id="coinAmount" 
                value={coinAmount}
                placeholder='# of coins'
                onChange={(e) => setCoinAmount(e.target.value)}
              />
            </div>
            <div className='p-1'/>
            <div className='pl-1'>
              <input className='accent-purple cursor-pointer'
                type="radio" 
                id="buy" 
                value="buy" 
                checked={buy === true} 
                onChange={handleBuy} />
              <label htmlFor="buy">Buy</label>
              <div className='p-1'/>
              <input className='accent-purple cursor-pointer'
                type="radio" 
                id="sell"
                value="sell" 
                checked={sell === true}
                onChange={handleSell} />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className='p-1'/>
            <button
              className='w-[250px]'
              onClick={() => addTrade()}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Submit'}
            </button>

            {formError && <p className='text-red'>{formError}</p>}
          </div>
          <div className='flex-col w-[250px] sm:w-[340px] pb-16 2xl:pb-0'>
            <div className="items-center grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 px-1 py-1 border-dark-border">
              <p className="text-sm text-left">Coin Name</p>
              <p className="text-sm text-right"># of Coins</p>
              <p className="text-sm text-right">Price</p>
              <p className='text-sm text-right hidden sm:table-cell'>Buy/ Sell</p>
            </div>
            {trades.length == 0 ? <p className="text-sm text-center pt-16 pb-16 border-t border-dark-border">Recent Trades</p> : 
            trades
            .slice(0, 8)
            .map((trade) => (
              <div key={trade.id} trade={trade} className=''>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 px-1 py-1 border-t border-dark-border">
                  <p className="text-sm text-left">{trade.coin}</p>
                  <p className="text-sm text-right">{trade.amount_of_coins}</p>
                  <p className={trade.buy == true ? "text-sm text-green text-right sm:hidden" : "text-sm text-red text-right sm:hidden"}>${trade.coin_price_usd.toLocaleString()}</p>
                  <p className="text-sm text-primary text-right hidden sm:table-cell">${trade.coin_price_usd.toLocaleString()}</p>
                  <p className='text-sm text-right hidden sm:table-cell'>{trade.buy == true ? 'Buy' : 'Sell'}</p>
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