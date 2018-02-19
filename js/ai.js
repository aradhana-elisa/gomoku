//Initializing the AI Game
function AiGame(){
    new $.gomoku($('#game'), {
        ai_first: null, //user will play
        board_size: size,
		board_color:color,
        endgame: function(computer_wins) {
			TearDown();
			if(!computer_wins){
				points1 =0;
				points1++;
				alert('You won in '+ secs + ' seconds');
			}
			else if(computer_wins) {
				points2 = 0;
				points2++;
				alert('Computer Won in '+ secs +' seconds');
			}
			document.getElementById("player1").innerHTML = 'Player 1 Score ' + points1;
			document.getElementById("player2").innerHTML = 'Player 2 (Computer) Score' + points2;
			
        }
    });
}

//Auxillary function for AI game to handle the moves and plot the winner
(function($){
    $.gomoku = function(el, options) {
        var defaults = {
                board_size: size,     //  the board's size, in number of cells; the board is square
                board_color : color,
				ai_first: null,     //  should the AI move first? possible values are true/false or null for random              //  whoever plays first, plays white
                endgame: null       //  callback function to execute when game ends;
            },
            game = this, board = [], board_size,board_color, cells, is_player_turn = false,

            ai_init = function() {

                game.settings = $.extend({}, defaults, options);
                game.board = el;
                board_size = game.settings.board_size;
                board_color = game.settings.board_color;
				
                var table = $('<table id="aigame">').css("background-color", '#'+board_color).on('click', 'td', function() {
                    if (!is_player_turn || board[cells.index(this)]) return false;
                    show_move(cells.index(this), 2);
                    computer_move();
                }), i, row;
                for (i = 0; i < board_size * board_size; i++) {
                    board[i] = 0;
                    if (!(i % board_size)) table.append(row = $('<tr>'));
                    row.append($('<td>'));
                }
                game.board.append(table);
                cells = $('td', game.board);
                if (game.settings.ai_first || (null === game.settings.ai_first && Math.random()+.5|0)) {
                    game.settings.ai_first = 1;
                    show_move(~~(board_size / 2) * (1 + board_size), 1);
                } else game.settings.ai_first = 2;
                is_player_turn = true;
            },

            show_move = function(index, type) {
                board[index] = type;
                $(cells[index]).addClass('p' + Math.abs(type - game.settings.ai_first));
				$(".p0").css("background-color", '#'+colorpiece2);
				$(".p1").css("background-color", '#'+colorpiece1);
            },
			
            computer_move = function() {

                var i, j, k, l, m, n, position, type, line, total_cells, consecutive_cells, empty_sides, best_score,cell_score, direction_score, score;
                is_player_turn = false;
                // iterate through all the board's cells
                for (i = board_size * board_size; i--;) {

                    if (board[i] == 1) continue;

                    else if (!board[i] && undefined === best_score) best_score = [i, 0, 0];
                    cell_score = [0, 0];

                    // the 4 directions to check: vertical, horizontal, diagonal /, diagonal \ (in this order)
                    for (j = 4; j--;) {
                        direction_score = [0, 0];
                        for (k = (!board[i] ? 5 : 1); k--;) {
                            // and the array with the cells on the current direction
                            type = board[i] || undefined; line = [];

                            // check the 5 pieces for each possible outcome, plus the 2 sides
                            for (l = 7; l--;) {

                                // used to compute position
                                m = -5 + k + l;
                                n = i % board_size;
                                if (
                                    // vertical
                                ((j === 0 &&
                                    (position = i + (board_size * m)) !== false &&
                                    n == position % board_size) ||
                                    // horizontal
                                    (j == 1 &&
                                        (position = i + m) !== false &&
                                        ~~(position / board_size) == ~~(i / board_size)) ||
                                    // diagonal /
                                    (j == 2 &&
                                        (position = i - (board_size * m) + m) !== false &&
                                        ((position > i && position % board_size < n) ||
                                            (position < i && position % board_size > n) ||
                                            position == i)) ||
                                    // diagonal \
                                    (j == 3 &&
                                        (position = i + (board_size * m) + m) !== false &&
                                        ((position < i && position % board_size < n) ||
                                            (position > i && position % board_size > n)) ||
                                        position == i)) &&
                                position >= 0 && position < board_size * board_size &&
							   (board[position] == type || (!board[i] && (!board[position] || undefined === type)) ||
                                    !l || l == 6)
                                ) {
                                    line.push(position);
                                    if (l && l ^ 6 && undefined === type && board[position]) type = board[position];

                                } else if (!l || l == 6) line.push(undefined);

                                else break;
                            }
                            if (line.length == 7 && undefined !== type) {
                                m = (board[i] ? true : false);
                                board[i] = type;
                                consecutive_cells = 0; total_cells = 0; empty_sides = 0;
                                for (l = 5; l--;) if (board[line[l + 1]] == type) total_cells++;
                                for (l = line.indexOf(i) - 1; l >= 0; l--)
                                    if (board[line[l]] == type) consecutive_cells++;
                                    else {
                                        if (board[line[l]] === 0) empty_sides++;
                                        break;
                                    }
                                for (l = line.indexOf(i); l < line.length; l++)
                                    if (board[line[l]] == type) consecutive_cells++;
                                    else {
                                        if (board[line[l]] === 0) empty_sides++;
                                        break;
                                    }
                                score = [[0, 1], [2, 3], [4, 12], [10, 64], [256, 256]][consecutive_cells >= total_cells ? Math.min(consecutive_cells, 5) - 1 : total_cells - 1][consecutive_cells >= total_cells ? (empty_sides ? empty_sides - 1 : 0) : 0];
                                if (!m) board[i] = 0;
                                else if (score >= 256) score = 1024;
                                if (score > direction_score[type - 1]) direction_score[type - 1] = score;
                            }
                        }
                        for (k = 2; k--;) cell_score[k] += direction_score[k];
                    }

                    j = cell_score[0] + cell_score[1];
                    k = best_score[1] + best_score[2];
                    if (
                    (j > k ||
                        (j == k && cell_score[0] >= best_score[1])) &&
                    (!board[i] || cell_score[1] >= 1024)
                    ) best_score = [i, cell_score[0], cell_score[1]];
                }
                if (best_score[2] < 1024) show_move(best_score[0], 1);
                if ((best_score[1] >= 256 || best_score[2] >= 1024) && typeof game.settings.endgame == 'function')
					
                return game.settings.endgame.apply(null, [best_score[2] < 1024]);
                is_player_turn = true;
				
				var numItems = $('.p0').length;
				document.getElementById("numberplayer1").innerHTML = 'Pieces of Player 1 :' +numItems;
				
				var numItems2 = $('.p1').length;
				document.getElementById("numberplayer2").innerHTML = 'Pieces of Player 2 :' +numItems2;
				
				var totalselections = numItems + numItems2;
				document.getElementById("totalpieces").innerHTML = 'Total number of Pieces: ' + totalselections;
				document.getElementById("currturns").innerHTML = 'Total number of Turns :'+numItems;
					
            };
        ai_init();
    };
})(jQuery);
