"use strict";

const main = document.querySelector('.main');

let game = 0;
let redBlue;
let color;
let letter;
let auxCount;
let spaceColor;
let countCol = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0,
    "E": 0,
    "F": 0,
    "G": 0
};
let slots = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": []
};
let ar = ["A","B","C","D","E","F","G"];
let lineUp = [];

const newTemplate = `
<div class='endGame hidden'>
    <div class='endToken'></div>
    <div class='win'></div>
    <button>Play Again</button>
</div>

<div class='theGame'>
    <div class='shift posD pos0'></div>

    <div class="root">
        <div class='spaces'>
            <div class="spc A6"></div>
            <div class="spc B6"></div>
            <div class="spc C6"></div>
            <div class="spc D6"></div>
            <div class="spc E6"></div>
            <div class="spc F6"></div>
            <div class="spc G6"></div>
            <div class="spc A5"></div>
            <div class="spc B5"></div>
            <div class="spc C5"></div>
            <div class="spc D5"></div>
            <div class="spc E5"></div>
            <div class="spc F5"></div>
            <div class="spc G5"></div>
            <div class="spc A4"></div>
            <div class="spc B4"></div>
            <div class="spc C4"></div>
            <div class="spc D4"></div>
            <div class="spc E4"></div>
            <div class="spc F4"></div>
            <div class="spc G4"></div>
            <div class="spc A3"></div>
            <div class="spc B3"></div>
            <div class="spc C3"></div>
            <div class="spc D3"></div>
            <div class="spc E3"></div>
            <div class="spc F3"></div>
            <div class="spc G3"></div>
            <div class="spc A2"></div>
            <div class="spc B2"></div>
            <div class="spc C2"></div>
            <div class="spc D2"></div>
            <div class="spc E2"></div>
            <div class="spc F2"></div>
            <div class="spc G2"></div>
            <div class="spc A1"></div>
            <div class="spc B1"></div>
            <div class="spc C1"></div>
            <div class="spc D1"></div>
            <div class="spc E1"></div>
            <div class="spc F1"></div>
            <div class="spc G1"></div>
        </div>

        <div class="board">
            <svg width="430" height="370" class='mask'>
                <mask id="Mask">
                <rect width="430" height="370" fill="white" opacity="1"/>
                    <circle cx="35" cy="35" r="25" />
                    <circle cx="35" cy="95" r="25" />
                    <circle cx="35" cy="155" r="25" />
                    <circle cx="35" cy="215" r="25" />
                    <circle cx="35" cy="275" r="25" />
                    <circle cx="35" cy="335" r="25" />
                    <circle cx="95" cy="35" r="25" />
                    <circle cx="95" cy="95" r="25" />
                    <circle cx="95" cy="155" r="25" />
                    <circle cx="95" cy="215" r="25" />
                    <circle cx="95" cy="275" r="25" />
                    <circle cx="95" cy="335" r="25" />
                    <circle cx="155" cy="35" r="25" />
                    <circle cx="155" cy="95" r="25" />
                    <circle cx="155" cy="155" r="25" />
                    <circle cx="155" cy="215" r="25" />
                    <circle cx="155" cy="275" r="25" />
                    <circle cx="155" cy="335" r="25" />
                    <circle cx="215" cy="35" r="25" />
                    <circle cx="215" cy="95" r="25" />
                    <circle cx="215" cy="155" r="25" />
                    <circle cx="215" cy="215" r="25" />
                    <circle cx="215" cy="275" r="25" />
                    <circle cx="215" cy="335" r="25" />
                    <circle cx="275" cy="35" r="25" />
                    <circle cx="275" cy="95" r="25" />
                    <circle cx="275" cy="155" r="25" />
                    <circle cx="275" cy="215" r="25" />
                    <circle cx="275" cy="275" r="25" />
                    <circle cx="275" cy="335" r="25" />
                    <circle cx="335" cy="35" r="25" />
                    <circle cx="335" cy="95" r="25" />
                    <circle cx="335" cy="155" r="25" />
                    <circle cx="335" cy="215" r="25" />
                    <circle cx="335" cy="275" r="25" />
                    <circle cx="335" cy="335" r="25" />
                    <circle cx="395" cy="35" r="25" />
                    <circle cx="395" cy="95" r="25" />
                    <circle cx="395" cy="155" r="25" />
                    <circle cx="395" cy="215" r="25" />
                    <circle cx="395" cy="275" r="25" />
                    <circle cx="395" cy="335" r="25" />
                </mask>
                <rect width="430" height="370" mask="url(#Mask)" />
            </svg>
        </div>

        <div class="columns">
            <div class="colA"></div>
            <div class="colB"></div>
            <div class="colC"></div>
            <div class="colD"></div>
            <div class="colE"></div>
            <div class="colF"></div>
            <div class="colG"></div>
        </div>
    </div>
</div>`;

const changeColor = () => {
    redBlue = !redBlue;
    (redBlue) ? color = 'red' : color = 'blue'
    document.querySelector('.shift').classList.add(color);
}

const drawLine = (lineUp, txt) => {
    lineUp.map(line => document.querySelector(`.${line}`).classList.add('line'))
    document.querySelector('.columns').removeEventListener('mousedown', clickHandler);
    document.querySelector('.endGame').classList.remove('hidden');
    document.querySelector('.endToken').classList.add(txt, 'line');
    document.querySelector('.win').innerHTML = `<p>${txt.toUpperCase()} WINS</p>`;
    console.warn(color,'wins',lineUp);
}

const control = () => {
    // VERTICAL posibles (3) en cada columna (7)
    for ( let j=0; j<7; j++) {
        for ( let i=0; i<3; i++ ) {
            // if ( A[0]==A[1] &&
            if (slots[ar[j]][i]   == slots[ar[j]][i+1] && 
                slots[ar[j]][i+1] == slots[ar[j]][i+2] &&
                slots[ar[j]][i+2] == slots[ar[j]][i+3] &&
                slots[ar[j]][i+3] != undefined)
                {
                    lineUp = [`${ar[j]}${i+1}`, `${ar[j]}${i+2}`, `${ar[j]}${i+3}`, `${ar[j]}${i+4}`];
                    drawLine(lineUp, slots[ar[j]][i]);
                }
        }
    }

    // HORIZONTAL posibles (4) en cada fila (6)
    for ( let j=0; j<4; j++) {
        for ( let i=0; i<6; i++ ) {
            if (slots[ar[j]][i]   == slots[ar[j+1]][i] && 
                slots[ar[j+1]][i] == slots[ar[j+2]][i] &&
                slots[ar[j+2]][i] == slots[ar[j+3]][i] &&
                slots[ar[j+3]][i] != undefined)
                {
                    lineUp = [`${ar[j]}${i+1}`, `${ar[j+1]}${i+1}`, `${ar[j+2]}${i+1}`, `${ar[j+3]}${i+1}`];
                    drawLine(lineUp, slots[ar[j]][i]);
                }
        }
    }

    // DIAGONAL ASCENDENTE (3) por fila (4) por columna
    for ( let j=0; j<4; j++) {
        for ( let i=0; i<3; i++ ) {
            if (slots[ar[j]][i]     == slots[ar[j+1]][i+1] && 
                slots[ar[j+1]][i+1] == slots[ar[j+2]][i+2] &&
                slots[ar[j+2]][i+2] == slots[ar[j+3]][i+3] &&
                slots[ar[j+3]][i+3] != undefined)
                {
                    lineUp = [`${ar[j]}${i+1}`, `${ar[j+1]}${i+2}`, `${ar[j+2]}${i+3}`, `${ar[j+3]}${i+4}`];
                    drawLine(lineUp, slots[ar[j]][i]);
                }
        }
    }

    // DIAGONAL DESCENDENTE (3) por fila (4) por columna
    for ( let j=0; j<4; j++) {
        for ( let i=0; i<3; i++ ) {
            if (slots[ar[j]][i+3]   == slots[ar[j+1]][i+2] && 
                slots[ar[j+1]][i+2] == slots[ar[j+2]][i+1] &&
                slots[ar[j+2]][i+1] == slots[ar[j+3]][i] &&
                slots[ar[j+3]][i] != undefined)
                {
                    lineUp = [`${ar[j]}${i+4}`, `${ar[j+1]}${i+3}`, `${ar[j+2]}${i+2}`, `${ar[j+3]}${i+1}`];
                    drawLine(lineUp, slots[ar[j]][i+3]);
                }
        }
    }

    // EMPATE
    if ((countCol.A==6)&&(countCol.B==6)&&(countCol.C==6)&&(countCol.D == 6)&&
        (countCol.E==6)&&(countCol.F==6)&&(countCol.G==6)&&(lineUp=='')) {
            document.querySelector('.columns').removeEventListener('mousedown', clickHandler);
            document.querySelector('.endGame').classList.remove('hidden');
            document.querySelector('.win').innerHTML = `<p>BOTH LOSES</p>`;
            document.querySelector('.endToken').classList.add('bicolor');
            console.warn('its a tie');
        }
}

const animation = (l,c) => {
    document.querySelector('.shift').classList.remove('posD','pos0');
    document.querySelector('.shift').classList.add(`pos${l}`,'pos7');
    document.querySelector('.columns').classList.toggle('hidden');

    setTimeout(()=>{
        document.querySelector('.shift').classList.remove('pos7');
        document.querySelector('.shift').classList.add(`pos${c}`);
    },100);

    setTimeout(()=>{
        document.querySelector('.shift').classList.remove(`pos${l}`,`pos${c}`);
        document.querySelector('.shift').setAttribute('class',`shift posD pos0`);
        document.querySelector('.shift').classList.toggle('hidden');

        spaceColor.classList.add(color)
        slots[letter].push(color);

    },900);

    setTimeout(()=>{
        control();
        changeColor();
        document.querySelector('.shift').classList.toggle('hidden');
        document.querySelector('.columns').classList.toggle('hidden');
    },1000);
}

const clickHandler = e => {
    letter = e.target.classList.value.slice(-1);
    auxCount = countCol[letter];

    if (auxCount < 6) {
        auxCount++;
        countCol[letter] = auxCount;
        spaceColor = document.querySelector(`.${letter}${auxCount}`);

        animation(letter,auxCount);
    }
}

const newGame = () => {
    main.innerHTML = newTemplate;
    countCol = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 0,
        "F": 0,
        "G": 0
    };
    slots = {
        "A": [],
        "B": [],
        "C": [],
        "D": [],
        "E": [],
        "F": [],
        "G": []
    };
    lineUp = [];

    game++;
    (game%2 != 0) ? redBlue = true : redBlue = false
    changeColor();

    document.querySelector('button').addEventListener('click', newGame);
    document.querySelector('.columns').addEventListener('mousedown', clickHandler)
    console.log('game n°',game,'starts',color);
}

newGame();