import { useState, useEffect } from 'react';
import axios from 'axios';

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