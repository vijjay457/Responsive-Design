const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function handleClick(event) {
  const cellIndex = event.target.dataset.index;
  if (board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      message.textContent = `${currentPlayer} wins!`;
      disableCells();
    } else if (isBoardFull()) {
      message.textContent = "It's a tie!";
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

function isBoardFull() {
  return board.every(cell => cell !== '');
}

function disableCells() {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
message.textContent = `${currentPlayer}'s turn`;
