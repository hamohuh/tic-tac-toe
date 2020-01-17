//the home screen
let homeScreen = document.getElementById('home');

//get the select element
let selectPlayer = document.getElementById('select-player');

//get the user imput names
let playerNameInput1 = document.getElementById('p1-name-input');
let playerNameInput2 = document.getElementById('p2-name-input');

//get the start button
let startButton = document.getElementById('start-button');
let backButton = document.getElementById('back-button');

//the game screen
let gameScreen = document.getElementById('game-screen');

//players names on the game screen the user entes
let playerName1 = document.getElementById('p1-name');
let playerName2 = document.getElementById('p2-name');

//players markers on the game screen the user entes
let playerMarker1 = document.getElementById('p1-marker').innerHTML;
let playerMarker2 = document.getElementById('p2-marker').innerHTML;


selectPlayer.addEventListener('change', function() {
    let style = this.value == 2 ? 'block' : 'none';
    document.getElementById('p2-name-div').style.display = style;
}) 


startButton.addEventListener('click', function(){
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    playerName1.innerHTML = playerNameInput1.value;
    playerName2.innerHTML = playerNameInput2.value;
    console.log(playerNameInput1.value);
    console.log(playerNameInput2.value);
})

backButton.addEventListener('click', function(){
    homeScreen.style.display = 'block';
    gameScreen.style.display = 'none';
})


const Player = (name, marker) => {
    return {name, marker}
}



const GameBoard = (() => {

    let gameBoard = [];

    const player1 = Player(playerNameInput1.value, playerMarker1);
    const player2 = Player(playerNameInput2.value, playerMarker2);
    

    let turn = true;
    function switchTurn(){
        if(turn == true){
            turn = false;
            return player1.marker;
        } else if(turn == false) {
            turn = true
            return player2.marker;
        } else {return}

    }

    //let cell = document.getElementsByClassName('cell');
    const cells = Array.from(document.querySelectorAll(".cell"));

    for(let i = 0; i < cells.length ;i++) {
        
        cells[i].addEventListener('click', function() {
            cells[i].setAttribute('data', i);
            if(cells[i].innerHTML == "") {
                cells[i].innerHTML = switchTurn();
            }else return;            

            if(comparison(cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML)){
                console.log(cells[0].innerHTML + " wins!");
            }
            
            
            
            comparison(cells[3].innerHTML, cells[4].innerHTML, cells[5].innerHTML);
            comparison(cells[6].innerHTML, cells[7].innerHTML, cells[8].innerHTML);

            comparison(cells[0].innerHTML, cells[3].innerHTML, cells[6].innerHTML);
            comparison(cells[1].innerHTML, cells[4].innerHTML, cells[7].innerHTML);
            comparison(cells[2].innerHTML, cells[5].innerHTML, cells[8].innerHTML);

            comparison(cells[0].innerHTML, cells[4].innerHTML, cells[8].innerHTML);
            comparison(cells[2].innerHTML, cells[4].innerHTML, cells[6].innerHTML);

            function comparison(a, b, c){
                if(a === b &&
                    a === c &&
                    a !== "") {
                }
            }
            

          
           
        
                
        })
    }

}) ();


/*

const displayController = (() => {

}) ();


*/