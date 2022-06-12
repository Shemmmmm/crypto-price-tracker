import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import debounce from "lodash.debounce";
import Coin from './Coin';
function App() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data);
      }).catch(error => console.log(error));
  }, []);
  const handleChange = (e) => {
    setSearch(e?.target?.value);
  }
  const debounceChange = debounce(handleChange, 500);

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a text</h1>
        <form>
          <input type="text" placeholder='Search' onChange={debounceChange} className="coin-input" />
        </form>
      </div>
      <div className='header'>
        <div className='_1'>Name</div>
        <div className='_2'>Price</div>
        <div className='_3'>Volume</div>
        <div className='_4'>Price change</div>
        <div className='_5'>Market cap</div>
      </div>
      <div className='filteredcoins'>
        {filteredCoins.map(coin => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />)
        })}
      </div>

    </div>
  );
}

export default App;
