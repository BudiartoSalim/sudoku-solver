const DefaultURL = `https://sudoku-solver-server-side.herokuapp.com`

$(document).ready(() => {
  generateGrid();
})

function generateGrid() {
  $(`#grid-body`).empty();
  for (let y = 0; y < 9; y++) {

    if (y % 3 === 0) {
      $(`#grid-body`).append(`<tr id="y-${y}" class="nth-row">`);
    } else {
      $(`#grid-body`).append(`<tr id="y-${y}">`);
    }

    for (let x = 0; x < 9; x++) {
      $(`#y-${y}`).append(`<td id="cell-${y}-${x}"></td>`);
      $(`#cell-${y}-${x}`).append(`
      <input type="number" id="input-${y}-${x}" min="0" max="9" class="cell-input">`);
    }
    $(`#grid-body`).append(`</tr>`);
  }
  $(`.result-msg`).hide();
  $(`#solve-button`).show();
}

function fillInitialBoard() {
  let board_string = '';
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      let input = $(`#input-${y}-${x}`).val();
      $(`#cell-${y}-${x}`).empty();

      if (input) {
        $(`#cell-${y}-${x}`).text(input);
        $(`#cell-${y}-${x}`).css("background-color", "gray");
        board_string += input;
      } else {
        board_string += '0';
      }
    }
  }
  return board_string;
}

function solvePuzzle(event) {
  event.preventDefault();
  $(`#solve-button`).hide();
  let board_string = fillInitialBoard();
  $.ajax(`${DefaultURL}/solve`, {
    method: 'POST',
    data: {
      board_string: board_string
    }
  })
    .done((response) => {
      if (!response.solution) {
        $(`#unsolved-msg`).show();
      } else {
        printResultsBoard(response.solution);
        $(`#solved-msg`).show();
      }
    })
    .fail((err) => {
      generateGrid();
    })
}

function printResultsBoard(boardArr) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      $(`#cell-${y}-${x}`).text(boardArr[y][x]);
    }
  }
}

function resetBoard() {
  event.preventDefault();
  generateGrid();
}
