import { useCallback, useState } from "react";

const GRID_SIZE = 4;
type Direction = "up" | "down" | "left" | "right";
const WIN_TILE = 2048;
const cloneBoard = (b: number[][]) => b.map((r) => r.slice());

const rotateLeft = (b: number[][]): number[][] => {
  const n = b.length;
  const out = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      out[n - 1 - j][i] = b[i][j];
    }
  }
  return out;
};

const rotateRight = (b: number[][]): number[][] => {
  const n = b.length;
  const out = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      out[j][n - 1 - i] = b[i][j];
    }
  }
  return out;
};

const flipHoriz = (b: number[][]): number[][] => {
  return b.map((row) => row.slice().reverse());
};


export const useGameLogic = () => {
  const [board, setBoard] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem("highScore") || 0);
  });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const isEmptyBoard = board.length === 0 || board.every((row) => row.every((cell) => cell === 0));


  const initBoard = () => {
    const newBoard = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newBoard);
    addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0)
    setGameOver(false)
    setWon(false)
  };

  const addRandomTile = (board: number[][]) => {
    const emptyCells: [number, number][] = [];
    board.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      })
    );
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
  };

    // perform a left move on the board. Returns new board and score gained.
  const moveLeftCore = (b: number[][]) => {
    const newBoard = cloneBoard(b);
    let totalGained = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
      const compressed = compressRow(newBoard[r]);
      const [merged, gained] = mergeRow(compressed);
      newBoard[r] = merged;
      totalGained += gained;
    }
    return { board: newBoard, gained: totalGained };
  }

    // compress a row left: remove zeros and pad with zeros on right
  const compressRow = (row: number[]) => {
    const newRow = row.filter((v) => v !== 0);
    while (newRow.length < GRID_SIZE) newRow.push(0);
    return newRow;
  };

  // merge a compressed row and return [rowAfterMerge, scoreGained]
  const mergeRow = (row: number[]) => {
    let gained = 0;
    const out = row.slice();
    for (let i = 0; i < GRID_SIZE - 1; i++) {
      if (out[i] !== 0 && out[i] === out[i + 1]) {
        out[i] = out[i] * 2;
        out[i + 1] = 0;
        gained += out[i];
      }
    }
    return [compressRow(out), gained] as const;
  };

  // handle move logic (basic demo — expand later)
  // generic move using rotations to map direction -> left
const move = useCallback(
  (direction: Direction) => {
    if (gameOver || won) return;

    let working = cloneBoard(board);
    if (direction === "up") working = rotateLeft(working);
    else if (direction === "down") working = rotateRight(working);
    else if (direction === "right") working = flipHoriz(working);

    const { board: after, gained } = moveLeftCore(working);

    let restored: number[][];
    if (direction === "up") restored = rotateRight(after);
    else if (direction === "down") restored = rotateLeft(after);
    else if (direction === "right") restored = flipHoriz(after);
    else restored = after;

    // Check if board changed
    const changed = (() => {
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (restored[i][j] !== board[i][j]) return true;
        }
      }
      return false;
    })();

    // If changed, update board/score and add random tile
    if (changed) {
      const newBoard = cloneBoard(restored);
      addRandomTile(newBoard);
      setBoard(newBoard);
      setScore((s) => {
        const ns = s + gained;
        if (ns > highScore) {
          localStorage.setItem("highScore", String(ns));
          setHighScore(ns);
        }
        return ns;
      });
    } else {
      // Board didn't change, but still check game over
      setBoard((b) => b); // force re-render if needed
    }

    // check win
    if (!won && restored.some((row) => row.some((v) => v >= WIN_TILE))) {
      setWon(true);
      setGameOver(true)
    }

    // Always check game over
    if (!won && !checkHasMoves(restored)) setGameOver(true);
  },
  [board, gameOver, highScore, won]
);


  const checkHasMoves = (b: number[][]) => {
    // if any zero exists -> moves left
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (b[i][j] === 0) return true;
      }
    }
    // if adjacent equal tiles exist -> moves left
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE - 1; j++) {
        if (b[i][j] === b[i][j + 1]) return true;
      }
    }
    for (let j = 0; j < GRID_SIZE; j++) {
      for (let i = 0; i < GRID_SIZE - 1; i++) {
        if (b[i][j] === b[i + 1][j]) return true;
      }
    }
    return false;
  };

  return { board, move, initBoard, score, highScore,isEmptyBoard,gameOver};
};
