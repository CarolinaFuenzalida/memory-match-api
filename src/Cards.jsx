import React from 'react';
import { useState, useEffect} from 'react'
import "./index.css"
import { shuffleCards, duplicateCards, compareCards } from './logic';


const Cards = ({score, setScore, setTime}) => {

const [result, setResult] = useState([]);
const [poke, setPoke] = useState([]);
const [load, setLoad] = useState(false);

const arr = [];
const selectedCards = [];
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
   /* setTime(true) */
}

const addFlip = (e) => {
    const selected = e.currentTarget;
    selected.classList.toggle('flip');
    selectedCards.push(selected);
    console.log("elegida:", selected,"array:", selectedCards);
    const flipCards = document.querySelectorAll('.flip');
    const flippedCards = document.querySelectorAll('.flipped');
     //console.log(flipCards[0].getAttribute('ind'))
    if (selectedCards.length === 2){
        if (selectedCards[0].getAttribute("ind") === selectedCards[1].getAttribute("ind")){
            selectedCards.forEach(card => {
            card.classList.add('flipped');
            })
            setScore(score + 1);
            selectedCards.length = 0;
        } else {
            selectedCards.forEach(card => {
                console.log("noson iwales dijo el daddy", card);
                setTimeout(() => card.classList.remove('flip'), 1000);
                })
                selectedCards.length= 0;
        }  
    }  if (flippedCards.length === poke.length) {
        alert("taweno");
    } 
}

    return (
        <>
        {!load ? <button onClick={loadCards} className="gameMark" id="startButton">Jugar</button> : 
        <div className="cardsCont">
        { poke.map((item, index) => (
            <>
                <div
                ind={item.name} 
                key={index}
                className="hidden card"
                onClick={(e) => addFlip(e)}>
                        <img className="front"src={item.sprites.front_default}/>
                        <p className='front pokeName'>{item.name}</p>
                        <img onClick={(e) => addFlip(e)} ind={item.name} className="back" src='https://e0.pxfuel.com/wallpapers/565/885/desktop-wallpaper-pixel-pokeball-cute-and-pink-minimal-pokeball.jpg'/>
                </div>      
        </>
        )) }
        </div> }
        </>
    )
}

export default Cards