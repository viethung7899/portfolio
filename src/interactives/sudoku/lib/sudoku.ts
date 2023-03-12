const SIZE = 9;
export type Position = [number, number];

export default class Sudoku {
  private _board: number[][];
  private _emptyCells: Set<number>;

  constructor() {
    this._board = new Array(SIZE);
    this._emptyCells = new Set();
    for (let i = 0; i < SIZE; i++) {
      this._board[i] = new Array(SIZE);
      for (let j = 0; j < SIZE; j++) {
        this._board[i][j] = 0;
        this._emptyCells.add(i * SIZE + j);
      }
    }
  }

  public reset() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        this._board[i][j] = 0;
        this._emptyCells.add(i * SIZE + j);
      }
    }
    return this;
  }

  get board() {
    return this._board;
  }

  get emptyCells() {
    return this._emptyCells;
  }

  setCell([row, col]: Position, value: number) {
    this._board[row][col] = value;
    this._emptyCells.delete(row * SIZE + col);
  }

  isValidRow([row, col]: Position, value: number) {
    for (let i = 0; i < SIZE; i++) {
      if (i === col || this._board[row][i] === 0) continue;
      if (this._board[row][i] === value) return false;
    }
    return true;
  }

  isValidCol([row, col]: Position, value: number) {
    for (let i = 0; i < SIZE; i++) {
      if (i === row || this._board[i][col] === 0) continue;
      if (this._board[row][col] === value) return false;
    }
    return true;
  }

  isValidBox([row, col]: Position, value: number) {
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i === row && j === col) continue;
        if (this._board[i][j] === 0) continue;
        if (this._board[i][j] === value) return false;
      }
    }
    return true;
  }
}