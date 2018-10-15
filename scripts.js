"use strict";

let origBoard;
let huPlayer;
let aiPlayer;
const winCombo = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];


const cells = document.querySelectorAll(".cell");
//let moveHistory = [];

startGame();

function choosePlayer(player)
{
  if(player === O)
  {
    huPlayer = 'O';
    aiPlayer = 'X';
  }else{
    huPlayer = 'X';
    aiPlayer = 'O';
  }
}

function startGame()
{
  document.querySelector(".endgame").style.display = "none";
  document.querySelector(".text").innerText = "";
  origBoard = Array.from(Array(9).keys());
  //console.log(origBoard);
  document.querySelector("#O").addEventListener("click",function(e){
    e.preventDefault();
    choosePlayer(O);
  });
  document.querySelector("#X").addEventListener("click",function(e){
    e.preventDefault();
    choosePlayer(X);
  });
  for(let i=0; i<cells.length; i++)
  {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click",trunClick,false);
  }
}

function trunClick(e)
{
  if( huPlayer == 'O' || huPlayer == 'X')
  {
    
    //console.log(origBoard[e.target.id]);
    if(typeof origBoard[e.target.id] == "number")
    {
      turn(e.target.id,huPlayer);
      //moveHistory.push(parseInt(e.target.id),huPlayer);
    }

    if(!checkTie())
    {
      turn(bestSpot(),aiPlayer);
      //moveHistory.push(bestSpot(),aiPlayer);
    }
    
    
  }else{
       alert("Please Choose Player Before start the Game!");
  }
}

function turn(positionId,player)
{
 origBoard[positionId] = player;
 document.getElementById(positionId).innerText = player;
 let gameWon = checkWin(origBoard,player);
 //console.log(gameWon);
 
 if(gameWon) gameOver(gameWon);
}

function checkWin(board,player)
{
  let played = board.reduce((a,e,i) => (e === player ? a.concat(i) : a), []);
  console.log(played);

  let gameWon = null;

  for(let [index,value] of winCombo.entries() )
  {
    if(value.every(elem => played.indexOf(elem) > -1 ) )
    {
     gameWon = {index:index,player:player};
     break;
    }
  }
  return gameWon;
}


function gameOver(gameWon)
{
  for(let index of winCombo[gameWon.index])
  {
    document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "green" : "red";
  }

  for(let i=0; i<cells.length; i++ )
  {
   cells[i].removeEventListener("click",trunClick,false);
  }
  decleareWinner(gameWon.player == huPlayer ? "You Win" : "You Lose");
}

function decleareWinner(who)
{
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".text").innerText = who;
}

function emptySpot()
{
  return origBoard.filter(val => typeof val == "number");
}

function bestSpot()
{
  // let emptySpot = origBoard.filter(val => typeof val == "number");
  return emptySpot()[0];
}

function checkTie()
{
 if(emptySpot().length == 0)
 {
   for (let i=0; i<cells.length; i++)
   {
     cells[i].style.backgroundColor = "blue";
     cells[i].removeEventListener("click",trunClick,false);
   }
   decleareWinner("Tie Game!");
   return true;
 }
 return false;
}

