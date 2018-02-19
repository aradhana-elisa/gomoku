//function to check for the wining conditions
function checkWinner() {
    // check if current player has a winning hand
    // only start checking when player x has size number of selections
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
    playerSelections = player2Selections;

	var cons=false;
	var count=0;

	for(i=0;i<playerSelections.length;i++){
		// check rows
		if(playerSelections[i]+1==playerSelections[i+1]){
			count++;
		}
		//check cols and diagonals based on size
		else if (size == 15) {
			if(playerSelections[i]+15 ==playerSelections[i+1]){
				count++;
			}
			else if(playerSelections[i]+16 ==playerSelections[i+1]){
				count++;
			}
		}
		else if (size == 19) {
			if(playerSelections[i]+19 ==playerSelections[i+1]){
				count++;
			}
			else if(playerSelections[i]+20 ==playerSelections[i+1]){
				count++;
			}
		}
		else{
			count=0;
		}
		if(count==4){
			cons=true;
		}
	}
	if(cons){
		win = true;
	}

    return win;
}
