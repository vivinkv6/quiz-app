import React,{useState} from 'react'
import CountDown from '../components/CountDown';


type CountDownProps={
  countdown:number,
  setCountdown:React.Dispatch<React.SetStateAction<number>>,
  getStart:boolean,
  setGetStart:React.Dispatch<React.SetStateAction<boolean>>
}
function Home({countdown,setCountdown,getStart,setGetStart}:CountDownProps) {

  return (
    <div>
      <CountDown countdown={countdown} setCountdown={setCountdown} getStart={getStart} setGetStart={setGetStart}/>
      
    </div>
  )
}

export default Home
