var currentPlayer = "X";
var gameBoard = Array(9).fill("");
var gameOver = false;

function handleCellClick(index) {
  if (!gameOver && gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerText = currentPlayer;
    if(checkGameOver()==0){
        document.getElementById("player-turn").innerText = "Match Tied";
        return;
    }
    else if(checkGameOver()==1){
        document.getElementById("player-turn").innerText = `Player X wins`;
        return;
    }
    else if(checkGameOver()==2){
        document.getElementById("player-turn").innerText = `Player O wins`;
        return;
    }
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("player-turn").innerText = "Player " + currentPlayer + "'s Turn";
}

function checkGameOver() {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (
      gameBoard[a] != "" &&
      gameBoard[a] == gameBoard[b] &&
      gameBoard[a] == gameBoard[c]
    ) {
      gameOver = true;
    //   document.getElementById("player-turn").innerText = `Player ${gameBoard[a]} wins`;
      if(gameBoard[a]=="X")return 1;
      return 2;
    }
  }

  if (!gameBoard.includes("")) {
    gameOver = true;
    return 0;
    // document.getElementById("player-turn").innerText = "Match Tied";
  }
  return -1;
}



function restartGame() {
  currentPlayer = "X";
  gameBoard = Array(9).fill("");
  gameOver = false;
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
  document.getElementById("player-turn").innerText = "Player " + currentPlayer + "'s Turn";
}

document.getElementById("restart-btn").addEventListener("click", restartGame);
var cells = document.getElementsByClassName("cell");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    handleCellClick(Array.prototype.indexOf.call(cells, this));
  });
}
