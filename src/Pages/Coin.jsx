import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import './Coin.css'
import DOMPurify from 'dompurify'
import ReactLoading from 'react-loading'


const Coin = () => {
    const params = useParams()
    const [aboutCoin, setAboutCoin] = useState({})
    const [isLoading , setIsLoading] = useState(true)

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`

    useEffect(() => {
        axios.get(url).then((res) => {
            setAboutCoin(res.data)
            setIsLoading(!isLoading)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const aboutCoinContent = <div className='coin-container'>
    <div className='content'>
        <h1>{aboutCoin.name}</h1>
    </div>
    <div className='content'>
        <div className='rank'>
            <span className='rank-btn'>Rank # {aboutCoin.market_cap_rank}</span>
        </div>
        <div className='info'>
            <div className='coin-heading'>
                {aboutCoin.image ?  <img src={aboutCoin.image.small} alt='/'/> : null}
               <p>{aboutCoin.name}</p>
               {aboutCoin.symbol ? <p>{aboutCoin.symbol.toUpperCase()}/USD</p> : null}
            </div>
            <div className='coin-price'>
                {aboutCoin.market_data?.current_price ? <h1>${aboutCoin.market_data.current_price.usd.toLocaleString()}</h1> : null}
             
            </div>
        </div>

    </div>

    <div className='content'>
        <table>
            <thead>
                <tr>
                    <th>1h</th>
                    <th>24h</th>
                    <th>7d</th>
                    <th>14d</th>
                    <th>30d</th>
                    <th>1yr</th>
                    
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{ aboutCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                    <td>{ aboutCoin.market_data?.price_change_percentage_24h_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                    <td>{ aboutCoin.market_data?.price_change_percentage_7d_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                    <td>{ aboutCoin.market_data?.price_change_percentage_14d_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                    <td>{ aboutCoin.market_data?.price_change_percentage_30d_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                    <td>{ aboutCoin.market_data?.price_change_percentage_1y_in_currency ? <p>{aboutCoin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className='content'>
        <div className='stats'>
            <div className='left'>
                <div className='row'>
                <h4>24 Hour Low</h4>
                {aboutCoin.market_data?.low_24h ? <p>${aboutCoin.market_data.low_24h.usd.toLocaleString()}</p> : null } 
                </div>

                <div className='row'>
                <h4>24 Hour High</h4>
                {aboutCoin.market_data?.high_24h ? <p>${aboutCoin.market_data.high_24h.usd.toLocaleString()}</p> : null } 
                </div>
               
            </div>
            <div className='right'>
            <div className='row'>
                <h4>Market Cap</h4>
                {aboutCoin.market_data ? <p>${aboutCoin.market_data.market_cap.usd.toLocaleString()}</p> : null }
                </div>

                <div className='row'>
                <h4>Circulating Supply</h4>
                { aboutCoin.market_data ? <p>{aboutCoin.market_data.circulating_supply}</p> : null }
                </div>
            </div>
        </div>
    </div>

    <div className='content'>
        <div className='about'>
            <h3>About</h3>
        
          <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(aboutCoin.description? aboutCoin.description.en : '' )}}></p>
        </div>
    </div>
  </div>
    
    
    return(
        <div>
          {isLoading ? <ReactLoading type='spin' 
                        color='#F1B007' height={100} 
                        width={100} className='loader'/> 
                        : aboutCoinContent}
        </div>
    )
}


export default Coin