const { useState } = React;

export function Board() {
  const initialState = Array(9).fill(null);
  const [squares, setSquares] = useState(initialState);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  const checkWinner = (squares) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    const possibleWinner = checkWinner(nextSquares);
    if (possibleWinner) {
      setWinner(possibleWinner);
    } else if (!nextSquares.includes(null)) {
      setWinner("Draw");
    }
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(initialState);
    setXIsNext(true);
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (winner === "Draw") return "It's a draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${xIsNext ? "X" : "O"}`;
  };

  return (
    <div className="game">
      <h2>Tic-Tac-Toe</h2>
      <div className="status">{getStatusMessage()}</div>
      <div className="grid">
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button id="reset" onClick={handleReset}>Reset</button>
    </div>
  );
}