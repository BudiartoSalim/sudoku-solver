const express = require('express');
const router = express.Router();
const SudokuController = require('../controllers/index-controller.js');
const sudokuInputCheck = require('../middlewares/input-check.js');

router.post('/solve', sudokuInputCheck, SudokuController.solveSudokuPostHandler);

module.exports = router;