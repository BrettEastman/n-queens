/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // create nBoard - new Board({n: n})
  var newBoard = new Board({n: n});
  var solution = newBoard.rows();
  // toggle the first space (i = 0; currentBoard = nBoard.toggle(i))
  // for loop over array of arrays (rows) (check all the possibilities of the current board with an added rook)
  var rookCount = 0;
  for (var i = 0; i < n; i++) {
    //create current row variable (currentArr = array[i])
    var currentRow = newBoard.rows()[i];
    // innerFunc(index, board)
    var innerFunc = function(board, index) {
      index = index || 0;
      for (var j = index; j < currentRow.length; j++) {
        //toggle the piece on
        board.togglePiece(i, j);
        //increment rookCount
        rookCount++;
        // check if there are any row conflicts
        if (board.hasAnyRooksConflicts()) {
          //toggle the piece off
          board.togglePiece(i, j);
          //decrement rookCount
          rookCount--;
          continue;
        // if no conflicts and n === number of rooks
        } else if (!board.hasAnyRooksConflicts() && rookCount === n) {
          //return true
          return solution;
        } else {
          //recursively call(solution) which is the current board with two toggles
          // i.e. innerFunc(k+1, solution)
          innerFunc(board, j + 1);
        }
      }
    };
    innerFunc(newBoard);
  }
  // valid solution is only when n pieces fit an nxn size board
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  //if not findNRooksSolution(n)
  if (!findNRooksSolution(n)) {
    //return solutionCount
    return solutionCount;
  }
  //create a new board
  var newBoard = new Board({n: n});
  // toggle the first space (i = 0; currentBoard = nBoard.toggle(i))
  // for loop over array of arrays (rows) (check all the possibilities of the current board with an added rook)
  var rookCount = 0;
  for (var i = 0; i < n; i++) {
    //create current row variable (currentArr = array[i])
    var currentRow = newBoard.rows()[i];
    // create startingPoint var = 0
    // if sta
    // innerFunc(index, board)
    var innerFunc = function(board, index) {
      index = index || 0;
      for (var j = index; j < currentRow.length; j++) {
        // debugger;
        //toggle the piece on
        board.togglePiece(i, j);
        //increment rookCount
        rookCount++;
        // check if there are any row conflicts
        if (board.hasAnyRooksConflicts()) {
          //toggle the piece off
          board.togglePiece(i, j);
          //decrement rookCount
          rookCount--;
          continue;
        // if no conflicts and n === number of rooks
        } else if (!board.hasAnyRooksConflicts() && rookCount === n) {
          //increment solution count
          solutionCount++;
          //clear the board
          //save the position of the first rook within the current solution
        } else {
          //recursively call(solution) which is the current board with two toggles
          // i.e. innerFunc(k+1, solution)
          innerFunc(board, j + 1);
          
        }
      }
    };
    innerFunc(newBoard);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
