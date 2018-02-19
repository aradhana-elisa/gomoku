var calcBestMove = function(depth, game, playerColor,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  if (depth === 0) {
    value = evaluateBoard(game.board(), playerColor);
    return [value, null]
  }
  var bestMove = null; // best move not set yet
  var possibleMoves = game.moves();
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    game.move(move);
    value = calcBestMove(depth-1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];
    console.log(isMaximizingPlayer ? 'Max: ' : 'Min: ', depth, move, value,
                bestMove, bestMoveValue);

    if (isMaximizingPlayer) {
      // Look for moves that maximize position
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      alpha = Math.max(alpha, value);
    } else {
      // Look for moves that minimize position
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    // Undo previous move
    game.undo();
    // Check for alpha beta pruning
    if (beta <= alpha) {
      console.log('Prune', alpha, beta);
      break;
    }
  }
