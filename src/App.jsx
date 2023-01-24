import Cards from './Cards.jsx'
import  Header  from './Header'
import Footer from './Footer.jsx';
import { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(0);


  return (
    <div className='mainCont'>
    <Header></Header>
    <Cards></Cards>
    <Footer></Footer>
    </div>
  )
}

export default App
