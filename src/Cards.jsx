import React from 'react';
import { useState, useEffect} from 'react'
import "./index.css"
import { shuffleCards, duplicateCards, compareCards } from './logic';


const Cards = () => {

const [result, setResult] = useState([]);
const [poke, setPoke] = useState([]);
const [load, setLoad] = useState(false);

const arr = [];
let finalArr = poke;
let URL = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${Math.floor(Math.random()* 500)}` 

// CÓMO HACER QUE LA PAGINA ESPERE AL FETCH PARA CARGAR?????????!!!?!?!??
useEffect(() => {
    fetch(URL) 
    .then((response) => response.json())
    .then((data) => setResult (
        data.results.map((item) => {
            fetch(item.url)
            .then((response) => response.json())
            .then((allData) => arr.push(allData))
            setPoke(arr)
        })  
    ))
}, []);

const loadCards = () => {
    duplicateCards(finalArr)
    .then((double) => shuffleCards(double))
    .then((result) => setPoke(result))
    .catch((err) => console.log("tamal", err))
    setLoad(true)
}
    return (
        <>
        {!load ? <button onClick={loadCards} className="gameMark" id="startButton">Jugar</button> : 
        <div className="cardsCont">
        { poke.map((item, index) => (
            <div className='mainCard'>
            <div
            ind={index} 
            key={index}
            className="hidden front card"> 
                    <img className="frontPic"src={item.sprites.front_default}/>
                    <p border="secondary">{item.name}</p>
            </div>
            <div 
            ind={index} 
            key={index}
            className="hidden back card"> 
                <img className="back" src='https://e0.pxfuel.com/wallpapers/565/885/desktop-wallpaper-pixel-pokeball-cute-and-pink-minimal-pokeball.jpg'/>
        </div>
        </div>
        )) }
        </div> }
        </>
    )
}

export default Cards