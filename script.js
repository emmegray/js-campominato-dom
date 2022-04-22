/*Js Griglia Campo Minato e gameplay definitivo
1. L'utente indica un livello di difficoltà al quale viene generata una griglia di gioco quadrata
    Ogni cella contiene un numero compreso tra:
    
    Difficoltà 1 > tra 1 e 100
    Difficoltà 2 > tra 1 e 81
    Difficoltà 3 > tra 1 e 49

2. Il computer genera 16 numeri casuali rispetto alla difficoltà selezionata
3. Cliccando su una casella con la bomba la cella di colora di rosso e la partita termina.
    Altrimenti la cella si colora di azzurro e l'utente può continuare a giocare.
4. Al termine della partita comunicare il punteggio con numero di volte che l'utente ha cliccato su una cella che non era una bomba.

BONUS:
1 - Bloccare il click sulle altre celle dopo che si ha cliccato una bomba e terminare la partita.
2 - Quando si clicca su una bomba e finisce la partita il software scopre tutte le bombe nascoste.
*/

const selezioneDifficolta = document.querySelector("#difficulty");
const griglia = document.querySelector('.griglia');
const tasto = document.querySelector('#play');

tasto.addEventListener('click', function (evento) {
    const livelloDifficolta = selezioneDifficolta.value;
    alert(`Difficoltà ${livelloDifficolta}`)
    creaGriglia(livelloDifficolta);
})

function creaGriglia(difficolta = 'easy'){
    griglia.className = (`griglia p-4 ${difficolta}`);
    griglia.innerHTML = ('');

    let numeroDiCelle = 25;
    if (difficolta === 'easy') {
        numeroDiCelle = 100;
    }
    if (difficolta === 'normal') {
        numeroDiCelle = 64;
    }
    if (difficolta === 'hard') {
        numeroDiCelle = 25;
    }

    const bombe = generaBombe(numeroDiCelle)
    const numeri = [];

    while (numeri.length < numeroDiCelle) {
        numeri.push(numeri.length + 1)
    }
    for (let index = 0; index < numeri.length; index++) {
        const numero = numeri[index];
        const quadrato = document.createElement('div')
        quadrato.className = 'quadrato';
        quadrato.textContent = numero;
        quadrato.addEventListener('click', function () {
            if (bombe.includes(numero)){
                quadrato.classList.add('bomb')
            } else {
                quadrato.classList.add('clicked')
            }
        })
        griglia.appendChild(quadrato);
    }
}

function generaBombe(numeroDiCelle, max) {
    const bombeGenerate = [];
    const bombe = 16;

    while (bombeGenerate.length < bombe) {
        const nuovaBomba = generaNumeroRandom (1, numeroDiCelle);
        if (!bombeGenerate.includes(nuovaBomba)){
            bombeGenerate.push(nuovaBomba);
        }
    }

    console.log(bombeGenerate);

    return bombeGenerate;
}


function generaNumeroRandom(min = 1, max = 2) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
