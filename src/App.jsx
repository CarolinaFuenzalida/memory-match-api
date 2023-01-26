import Cards from './Cards.jsx'
import  Header  from './Header'
import Footer from './Footer.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [time, setTime] = useState(false)
  

  useEffect(() => {
      if(time) {
        let timer = setInterval(() => {
          setSeconds(seconds -1)

          if(seconds === 0){
              setMinutes(minutes -1)
              setSeconds(59)
          }
      }, 1000)
      return () => clearInterval(timer)
      }
  }, [seconds, time])


  return (
    <div className='mainCont'>
    <Header score={score} seconds={seconds} minutes={minutes}></Header>
    <Cards score={score} setScore={setScore} setTime={setTime}></Cards>
    <Footer></Footer>
    </div>
  )
}

export default App
