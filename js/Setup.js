/*
This file will contain 2 methods. 
Init and TearDown
 */
 
var winners = new Array();
var player1Selections = new Array(); //store the moves of player 1
var player2Selections = new Array(); //store the moves of player 2
var currentPlayer = 0; //assign the current player (Player 1)
var move = 0; //to count the number of moves
var points1 = 0;    // player 1 points
var points2 = 0;   // player 2 points
var timer; //timer since the page load
var size, mode,color, colorpiece1, colorpiece2; //size of the grid - 15 or 17 and mode - multi or single

function Init() {
	if($("input:radio[name='mode']").is(":checked")) {
		if($("input:radio[name='gridsize']").is(":checked")) {
			size = griddim.gridsize.value;
			mode = griddim.mode.value;
			color = griddim.gridcolor.value;
			colorpiece1 = griddim.piece1.value;
			colorpiece2 = griddim.piece2.value;
			timer();
			
			if(mode =="single"){
				document.getElementById('tbl').style.display = "none";
				AiGame();
				document.getElementById('game').style.display = "block";
			}else{
				document.getElementById('game').style.display = "none";
				Human();
				document.getElementById('tbl').style.display = "block";
			}
		}
		else {
			alert('Please select the size of the grid');
		}
	} 
	else {
		alert('Please select the mode of the game');
	}
}

function TearDown() {
	currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
	myStopFunction();
}
  
   
var secs = 0;
var id;
function timer() {
		id = setInterval(function(){
			secs++;
			document.getElementById('timer').innerHTML =('Total Time: '+ secs + ' seconds');
		}, 1000);
		return secs;
}

function myStopFunction() {
    clearInterval(id);
}

