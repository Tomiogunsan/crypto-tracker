import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coins from './component/Coins'
import Navbar from './component/Navbar'
import {Routes, Route } from 'react-router-dom'
import Coin from './Pages/Coin'

function App() {
  const [coin ,setCoin] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'

  useEffect(() =>{axios.get(url).then((res) =>{
    setCoin(res.data)
    console.log(res.data[0])
  }).catch((error) =>{
    console.log(error)
  })}, [])

 


  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={ <Coins coins={coin} />} />
        <Route path='/coin' element={ <Coin />}>
          
           <Route path=':coinId' element={<Coin />}/>
        </Route>
      </Routes>
    
    </div>
  );
}

export default App;
