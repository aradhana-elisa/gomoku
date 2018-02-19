/*
this file should handle the code for the human, refactorn the code from the ZebraGomuku
and return the move of the player, pass to the board to plot it, maybe create a function to plot the moves
 */ 
function Human() {
	//get the values of size, mode, color of the grid and the pieces from the form
	var id = 0;
	var tbl = document.getElementById('tbl');
	while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
	tbl.style.backgroundColor = '#'+color;
	for(var i=0; i< size; i++) {
		// creating the rows
		var row = document.createElement('tr');
		for(j=0; j< size; j++) {
			// creating the column
			var col = document.createElement('td');
			col.width= "53px";
			col.height= "53px";
			col.id = id++;
			
			var handler = function(e) {
				e.preventDefault();
				//for two player game
				if (mode == 'multi') {
					if (currentPlayer == 0) {
						this.className = "pieceX";
						this.style.backgroundColor = '#'+colorpiece1;
						player1Selections.push(parseInt(this.id));
						player1Selections.sort(function(a, b) { return a - b });
						document.getElementById("numberplayer1").innerHTML = 'Pieces of Player 1 :' +player1Selections.length;
					}

					else {
						this.className = "pieceO";
						this.style.backgroundColor = '#'+colorpiece2;
						player2Selections.push(parseInt(this.id));
						player2Selections.sort(function(a, b) { return a - b });
						document.getElementById("numberplayer2").innerHTML = 'Pieces of Player 2 :'+ player2Selections.length;
					}
					//output the total number of pieces on the board.
					var totalselections = player1Selections.length + player2Selections.length;
					document.getElementById("totalpieces").innerHTML = 'Total number of Pieces: ' +totalselections;
					document.getElementById("currturns").innerHTML = 'Total number of Turns: ' +totalselections;
					move++;
					// check the winner
					var isWin = checkWinner();

					if (isWin){
						if(currentPlayer == 0) {
							currentPlayer = 'Player 1';
							points1++;
						}
						else {
							points2++;
							currentPlayer = 'Player 2';
						}
						alert(currentPlayer + ' has won the game in '+ secs + ' seconds');
						document.getElementById("player1").innerHTML = 'Player 1 Score ' + points1;
						document.getElementById("player2").innerHTML = 'Player 2 Score ' + points2;

						TearDown();
						Human();
					}

					else {
						if (currentPlayer == 0)
							currentPlayer = 1;
						else
							currentPlayer = 0;
						this.removeEventListener('click', arguments.callee);
					}
				}
            };
			col.addEventListener('click', handler);
			row.appendChild(col);
		}
		tbl.appendChild(row);
	}
	return true;
}
