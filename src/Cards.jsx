import React from 'react';
import { useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'

const Cards = () => {
const [result, setResult] = useState([]);
const [poke, setPoke] = useState([]);
const [load, setLoad] = useState(false);
const arr = [];
let shuffledArr = poke;

let URL = `https://pokeapi.co/api/v2/pokemon?limit=5&offset=${Math.floor(Math.random()* 500)}` 

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
            console.log(arr)
        })
        
    ))
    
}, []);

const loadCards = () => {
    setPoke(poke.concat(poke)) // Se duplican las cartas de pokemon.
    shuffledArr = Math.random(poke)
    /*arr.concat(poke)
    for(let i = arr.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    } */
    
   /* let i = shuffledArr.length, j, temp; //j es un n° al azar que se generará en un ciclo y será guardado en temp.
    while (--i > 0) { //empieza con el total de cartas y va restando una
      j = Math.floor(Math.random() * (i + 1))//j toma un valor y se genera función random entre 0 e i
      temp = shuffledArr[j]; // se establece temp y se llama a j
      shuffledArr[j] = shuffledArr[i]; // se toma j y se cambia por i (índice del ciclo)
      shuffledArr[i] = temp; //se toma i para dar un valor temporal temp.
    }*/
    setLoad(true)
}

console.log(arr)

    return (
        <>
        <button onClick={loadCards}>Jugar</button>
        {load ? shuffledArr.map((item) => (
            <Card
            border="secondary"> 
                <Card.Body id={item.name}> 
                    <Card.Img src={item.sprites.front_default}/>
                    <Card.Title border="secondary">{item.name}</Card.Title>
                </Card.Body>
            </Card>
        )) : ""}
        </>
    )
}

export default Cards