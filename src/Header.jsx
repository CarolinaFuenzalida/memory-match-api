import { useState, useEffect } from "react"; 

const Header = ({score, seconds, minutes}) => {

    return (
        <div id="header">
            <div className="gameMark"> <p>Aciertos : {score} </p> </div>
            <h1> Memory <br></br> Match </h1>
            <div className="gameMark"> <p>Tiempo : {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p> </div> 
        </div>
    )
}

export default Header