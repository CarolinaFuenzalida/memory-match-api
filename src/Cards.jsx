import React from 'react';
import { useState, useEffect} from 'react'
import "./index.css"
import { shuffleCards, duplicateCards, compareCards } from './logic';
import Swal from 'sweetalert2'


const Cards = ({score, setScore}) => {

const [result, setResult] = useState([]);
const [poke, setPoke] = useState([]);
const [load, setLoad] = useState(false);
const [recall, setRecall] = useState(0);
const arr = [];
const selectedCards = [];
let finalArr = poke;
let URL = `https://pokeapi.co/api/v2/pokemon?limit=6&offset=${Math.floor(Math.random()* 500)}` 


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
}, [recall]);

useEffect(() => {
    if(score === 6) {
        Swal.fire({
            imageUrl: 'https://i.pinimg.com/originals/c4/e9/fb/c4e9fb748d0d0e284c744dea3da89a7f.gif',
            imageHeight: 200,
            imageWidth: 200,
            title: '¡Felicidades! Los has atrapado a todos'
        }).then(result => {
            setRecall(recall +1)
            if(result.isConfirmed){
                setScore(0)
                arr.length = 0;
                selectedCards.length = 0;
                setLoad(false)
            }
        })
    }
}, [score])

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