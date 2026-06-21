(function() {
  'use strict';
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('statusText');
  const restartBtn = document.getElementById('restartBtn');

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let running = true;

  function updateStatus() {
    if (!running) {
      return;
    }
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWinner() {
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        running = false;
        statusText.textContent = `Player ${board[a]} wins! `;
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    if (board.every(cell => cell !== '')) {
      running = false;
      statusText.textContent = "It's a draw!";
      return true;
    }
    return false;
  }

  function handleCellClick(e) {
    const cell = e.target.closest('.cell');
    if (!cell) return;

    const index = parseInt(cell.getAttribute('cellIndex'), 10);

    if (!running || board[index] !== '' || index < 0 || index > 8) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      return;
    }
    if (checkDraw()) {
      return;
    }

    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    updateStatus();
  }

  function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    running = true;
    statusText.textContent = "Player X's turn";
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartBtn.addEventListener('click', restartGame);

  restartGame();
})();