const Sudoku = require('../models/Sudoku.js');

class SudokuController {
  static solveSudokuPostHandler(req, res, next) {
    const boardString = req.body.board_string;
    let solvingBoard = new Sudoku(boardString);
    let solvedBoard;
    let result = solvingBoard.solve();
    if (result === false) {
      res.status(200).json({ solution: false })
    } else {
      solvedBoard = solvingBoard.finalGridCheck();
      res.status(200).json({ solution: solvedBoard });
    }
  }
}

module.exports = SudokuController;