class Sudoku {
  constructor(board_string) {
    this._board_string = board_string;
    this._board = this.generateBoard(board_string);
    this._startingBoard = this.generateBoard(board_string);
    this.firstEmptyCell = this.getFirstEmptyCell(this.startingBoard);
    this.noSolution = false;
    this.counter = 0;
  }

  get board() {
    return this._board;
  }
  get startingBoard() {
    return this._startingBoard;
  }

  get board_string() {
    return this._board_string;
  }

  getFirstEmptyCell(board) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (board[y][x] === '0') {
          return { y: y, x: x }
        }
      }
    }
  }

  finalGridCheck() {
    let solvable = true;
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (this._board[y][x] === "0") {
          solvable = false;
        }
      }
    }
    if (solvable) {
      return this.board;
    } else {
      return;
    }
  }

  solve() {
    if (this.counter > 600000) { //safety net to stop infinite recursion on ajax call
      return false;
    }
    this.counter++;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) { //traverse each cells horizontally
        if (this.board[y][x] === "0") { //to find "0" or empty cell

          this.arrivedAtFirstEmptyCell = true;
          for (let val = 1; val < 10; val++) { //value loop; loop thru all possible value
            if (this.checkHorizontal(val.toString(), y)) { //if no dupe in horizontal line
              if (this.checkVertical(val.toString(), x)) { //if no dupe in vertical line
                if (this.checkSquare(val.toString(), x, y, this.board)) { //if no dupe in box
                  this.board[y][x] = val.toString(); //try the value
                  let solved = this.solve();         //calls the function again to find next
                  if (solved === false) {  //if no solution found on above one
                    this.board[y][x] = "0"; //reset the value and cycle thru the value again
                  }
                }
              }
            }
          }
          if (this.board[y][x] === "0") { //if no solution found on value loop

            if (x === this.firstEmptyCell.x && y === this.firstEmptyCell.y) { //attempt for safety net
              this.noSolution = true;  //failed as of now but left as is for future refactors
            }
            return false; //return false; backtracking to previous
          } else {

          }
        }
      }
    }
  }
  checkVertical(param, xCoord) {
    for (let i = 0; i < 9; i++) {
      if (this._board[i][xCoord] === param) {
        return false;
      }
    }
    return true;
  }
  checkHorizontal(param, yCoord) {
    for (let i = 0; i < 9; i++) {
      if (this._board[yCoord][i] === param) {
        return false;
      }
    }
    return true;
  }
  checkSquare(param, currentx, currenty, board) {
    let xCoord = Math.floor(currentx / 3);
    let yCoord = Math.floor(currenty / 3);
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (board[y + (yCoord * 3)][x + (xCoord * 3)] === param) {
          return false;
        }
      }
    }
    return true;
  }

  // Returns a 2 dimensional array representing the current state of the board
  generateBoard(board_string) {
    let counter = 0;
    let output = [];
    for (let y = 0; y < 9; y++) {
      output.push([]);
      for (let x = 0; x < 9; x++) {
        output[y].push(board_string[counter]);
        counter++;
      }
    }
    return output;
  }
}

module.exports = Sudoku;