"use strict";

const root = document.querySelector('.root');

let color = 0;
let letter;
let auxCount;
let dir;
let countCol = {
    "A":0,
    "B":0,
    "C":0,
    "D":0,
    "E":0,
    "F":0,
    "G":0
}

const clickHandler = e => {
    letter = e.target.classList.value.slice(-1);
    auxCount = countCol[letter];

    if (auxCount < 6) {
        color++;
        auxCount++;
        countCol[letter] = auxCount;
        dir = document.querySelector(`.${letter}${auxCount}`);

        ( color%2 != 0 ) ? dir.classList.add('red') : dir.classList.add('blue')
        
        console.log(color,letter,auxCount);
    }
}

document.querySelector('.columns').addEventListener('mousedown', clickHandler)