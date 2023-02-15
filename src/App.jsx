import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleClick = (block) => {
    const [x, y] = block;
    const isWhite = (x + y) % 2 === 0;
    if (isWhite) {
      setSelectedBlock(block);
    }
  };

  const isDiagonal = (x1, y1, x2, y2) => {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);
    return dx === dy;
  };

  const isHighlighted = (x, y) => {
    if (!selectedBlock) {
      return false;
    }
    const [selectedX, selectedY] = selectedBlock;
    return isDiagonal(x, y, selectedX, selectedY);
  };

  const renderBlock = (x, y) => {
    const isWhite = (x + y) % 2 === 0;
    const className = `block ${isWhite ? "white" : "black"} ${
      isHighlighted(x, y) ? "highlighted" : ""
    }`;
    return (
      <div
        key={`${x},${y}`}
        className={className}
        onClick={() => handleClick([x, y])}
      />
    );
  };

  const renderRow = (y) => {
    const row = [];
    for (let x = 0; x < 8; x++) {
      row.push(renderBlock(x, y));
    }
    return (
      <div className="row" key={y}>
        {row}
      </div>
    );
  };

  const board = [];
  for (let y = 0; y < 8; y++) {
    board.push(renderRow(y));
  }

  return <div className="chess-board">{board}</div>;
}

export default App;
