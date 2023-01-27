import { useState, useEffect } from "react"; 

const Header = ({score}) => {
    const [seconds, setSeconds] = useState(59);
    const [minutes, setMinutes] = useState(1);
  
    
  
    useEffect(() => {
        let timer = setInterval(() => {
        setSeconds(seconds -1)
  
        if(seconds === 0){
            setMinutes(minutes -1)
            setSeconds(59)
        }
    }, 1000)
    return () => clearInterval(timer)    
    }, [seconds])

    return (
        <div id="header">
            <div className="gameMark"> <p>Aciertos : {score} </p> </div>
            <h1> Memory <br></br> Match </h1>
            <div className="gameMark"> <p>Tiempo : {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p> </div> 
        </div>
    )
}

export default Header