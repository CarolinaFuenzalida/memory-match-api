import Cards from './Cards.jsx'
import  Header  from './Header'
import Footer from './Footer.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(0)



  return (
    <div className='mainCont'>
    <Header score={score} ></Header>
    <Cards score={score} setScore={setScore}></Cards>
    <Footer></Footer>
    </div>
  )
}

export default App
