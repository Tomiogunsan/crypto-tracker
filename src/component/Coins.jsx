import React, { useState } from 'react'
import CoinItem from './CoinItem'
import './Coins.css'
import {Link } from 'react-router-dom'
import Coin from '../Pages/Coin'

const Coins = (props) => {
  const [search, setSearch] = useState('')
  
  const searchFor = (event) => {
      setSearch(event.target.value)
  }
  return (
    < div className='container'>
      <div className= 'search'>
        <label htmlFor='search'>Search</label>
        <input placeholder='Enter a coin name' onChange={searchFor} />
      </div>
      <div>
      <div className='heading'>
        <p>#</p>
        <p className='coin-name'>Coin</p>
        <p>Price</p>
        <p>24h</p>
        <p className='hide-mobile'>Volume</p>
        <p className='hide-mobile'>Mkt Cap</p>
      </div>

      {props.coins.filter(coins => {
        if(search === ''){
          return coins
        }else if (coins.name.toLowerCase().includes(search.toLowerCase())){
          return coins
        }
      }).map(coins => {
        return (
          <Link to={`/coin/${coins.id}`} element={ <Coin />} key={coins.id}>
          <CoinItem coin={coins}  />
          </Link>
        )
      })}
      </div>
    </div>
  )
}

export default Coins
