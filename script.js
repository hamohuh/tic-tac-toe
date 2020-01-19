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
    let style = this.value == 1 ? 'block' : 'none';
    document.getElementById('p2-name-div').style.display = style;
}) 

//This object to hold the player's name and marker
const Player = (name, marker) => {
    return {name, marker}
}


/**
 * This object to controll the game board and the opertions inside it
 * it will render the X's and O's once the user click on any cell
 */
const GameBoard = (() => {

    let gameBoard = ["","","","","","","","",""];

    const player1 = Player(playerNameInput1.value, playerMarker1);
    const player2 = Player(playerNameInput2.value, playerMarker2);
    

    const render =  () => {
        //let cell = document.getElementsByClassName('cell');
        const cells = Array.from(document.querySelectorAll(".cell"));
        let turn = true;

        //itterate over the cells array and push every clicked cell value to our gameBoard array
        //at a specific index and replace the old value with our new value
        for(let i = 0; i < cells.length ;i++) {
            cells[i].addEventListener('click', function() {
                if(cells[i].innerHTML == "") {
                    cells[i].innerHTML = switchTurn();
                    gameBoard.splice(i, 1, cells[i].innerHTML)
                    console.log(gameBoard);
                }else return;            

                //this function to switch the game turns between X and O
                function switchTurn(){
                    if(turn == true){
                        document.getElementById('turn').innerHTML = `It's ${player2.name} turn`;
                        turn = false;
                        return player1.marker;
                    } else if(turn == false) {
                        document.getElementById('turn').innerHTML = `It's ${player1.name} turn`;
                        turn = true
                        return player2.marker;
                    } else {return}
                }

                //this function to alert X or O wins
                const resetAfterWin = (xyz) => {
                    if(xyz == "X") {
                        alert(player1.name + " wins!")
                    } else{
                        alert(player2.name + " wins!")
                    }
                    DisplayController.reset()
                }

                //this function to make the compare in the cells to determine who won the turn
                function whoWins() {
                    if(comparison(gameBoard[0], gameBoard[1], gameBoard[2])) resetAfterWin(gameBoard[0]);
                    if(comparison(gameBoard[3], gameBoard[4], gameBoard[5])) resetAfterWin(gameBoard[3]);
                    if(comparison(gameBoard[6], gameBoard[7], gameBoard[8])) resetAfterWin(gameBoard[6]);

                    if(comparison(gameBoard[0], gameBoard[3], gameBoard[6])) resetAfterWin(gameBoard[0]);
                    if(comparison(gameBoard[1], gameBoard[4], gameBoard[7])) resetAfterWin(gameBoard[1]);
                    if(comparison(gameBoard[2], gameBoard[5], gameBoard[8])) resetAfterWin(gameBoard[2]);

                    if(comparison(gameBoard[0], gameBoard[4], gameBoard[8])) resetAfterWin(gameBoard[0]);
                    if(comparison(gameBoard[2], gameBoard[4], gameBoard[6])) resetAfterWin(gameBoard[5]);
                            
                    function comparison(a, b, c){
                        if(a == b &&
                            a == c &&
                            a !== ""){return true}
                    }
                }    
                whoWins();
            })
        }
    }
    
    //this function we will call it in every reset to make our gameBoard array empty
    const emptyBoard = ()=> {
        gameBoard = ["","","","","","","","",""];
    }

    return{
        render, emptyBoard
    }
}) ();


/**
 * This object to control our display when we start or reset the game
 */
const DisplayController = (() => {

    const startGame = () => {
        GameBoard.render()
        homeScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        playerName1.innerHTML = playerNameInput1.value;
        playerName2.innerHTML = playerNameInput2.value;
        document.getElementById('turn').innerHTML = `It's ${playerName1.innerHTML} turn`;
        
    }

    const reset = () => {
            homeScreen.style.display = 'block';
            gameScreen.style.display = 'none';
            
    
            const cells = Array.from(document.querySelectorAll(".cell"));
            for(let i = 0; i < 9 ;i++) {
            cells[i].innerHTML = ""}
            GameBoard.emptyBoard();
        
    }
    return{
        startGame, reset
    }

}) ();

startButton.addEventListener('click', DisplayController.startGame);
backButton.addEventListener('click', DisplayController.reset)

