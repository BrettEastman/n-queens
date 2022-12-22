// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // create count variable to keep track of '1's
      var count = 0;
      // for loop
      for (var i = 0; i < this.get(rowIndex).length; i++) {
        // add '1's to count
        if (this.get(rowIndex)[i] === 1) {
          count++;
        }
      }
      // if count is less than 2
      if (count < 2) {
        // return false
        return false;
      }
      return true;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = true;
      // iterate over the matrix
      for (var i = 0; i < this.rows().length; i++) {
        // use hasRowConflict on each row
        hasConflict = this.hasRowConflictAt(i);
        if (hasConflict) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // create count var
      var count = 0;
      // for each row
      for (var i = 0; i < this.rows().length; i++) {
        // iterate over every row
        var currentRow = this.rows()[i];
        // check the column index to see if 0 or 1
        // if 1
        if (currentRow[colIndex] === 1) {
          // add to count
          count++;
          console.log('count', count);
        }
      }
      // if count more than 1
      if (count > 1) {
        // then return true
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // iterate over matrix using rows.length
      for (var i = 0; i < this.rows().length; i++) {
        // create current index
        var currentInd = i;
        // if current column hasColConflictAt
        if (this.hasColConflictAt(currentInd)) {
          // if so, then return true
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      //if mDInd > -1
      if (majorDiagonalColumnIndexAtFirstRow > -1) {
        //var idx = mDInd
        var colIndex = majorDiagonalColumnIndexAtFirstRow;
        //var start = 0
        var start = 0;
      // else
      } else {
        //var idx = 0
        var colIndex = 0;
        //var start = Math.abs(mDInd)
        var start = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      }
      //iterate over the rows starting at start
      for (start; start < this.rows().length; start++) {
        var currentRow = this.rows()[start];
        // if the element at idx is 1
        if (currentRow[colIndex] === 1) {
          // increment count
          count++;
        }
        // increment idx
        colIndex++;
        //if idx is larger than number of rows
        if (colIndex > this.rows().length) {
          // break
          break;
        }
      }
      // if count is larger than 1
      if (count > 1) {
        //return true
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // iterate over major diagonals
      // for the current major diagonal
      for (var i = -this.rows().length + 2; i <= this.rows().length - 2; i++) {
        // if hasMajorDiagonalConflictsAt(currentMajorDiagonal)
        if (this.hasMajorDiagonalConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      //if mDInd < number of rows
      if (minorDiagonalColumnIndexAtFirstRow < this.rows().length) {
        //var idx = mDInd
        var colIndex = minorDiagonalColumnIndexAtFirstRow;
        //var start = 0
        var start = 0;
      // else
      } else {
        //var idx = 0
        var colIndex = this.rows().length - 1;
        //var start = Math.abs(mDInd)
        var start = minorDiagonalColumnIndexAtFirstRow - this.rows().length + 1;
      }
      //iterate over the rows starting at start
      for (start; start < this.rows().length; start++) {
        var currentRow = this.rows()[start];
        // if the element at idx is 1
        if (currentRow[colIndex] === 1) {
          // increment count
          count++;
        }
        // decrement idx
        colIndex--;
        //if idx is less than 0
        if (colIndex < 0) {
          // break
          break;
        }
      }
      // if count is larger than 1
      if (count > 1) {
        //return true
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate over Minor diagonals
      // for the current Minor diagonal
      for (var i = this.rows().length - 2; i <= this.rows().length + 2; i++) {
        // if hasMinorDiagonalConflictsAt(currentMinorDiagonal)
        if (this.hasMinorDiagonalConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
