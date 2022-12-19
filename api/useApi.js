import { useState, useEffect } from 'react';
import axios from 'axios';

// Client side data fetcher :: if used should probably change to SWR

// NOT CURRENTLY USING IN THIS PROJECT (leaving it just in case I want to use for future additions)
const useApi = (url) => {

  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect (() => {
    axios.get(url)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url])

  return { coins, error }; 
}

export default useApi