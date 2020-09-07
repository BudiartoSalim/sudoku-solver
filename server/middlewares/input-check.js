function sudokuInputCheck(req, res, next) {
  if (req.body.board_string.length !== 81) {
    res.status(400).json({ msg: "Invalid input: value size is different" })
  } else {
    next();
  }
}

module.exports = sudokuInputCheck;