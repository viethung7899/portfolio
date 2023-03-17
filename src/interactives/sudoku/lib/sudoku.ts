export const BOX_SIZE = 3;
export const SIZE = BOX_SIZE * BOX_SIZE;
export type Position = [number, number];
export type Cell = {
  value: number;
  canModify: boolean;
}

export default class Sudoku {
  private _board: Cell[][];

  constructor() {
    this._board = new Array(SIZE);
    for (let i = 0; i < SIZE; i++) {
      this._board[i] = new Array(SIZE);
      for (let j = 0; j < SIZE; j++) {
        this._board[i][j] = {
          value: 0,
          canModify: true,
        };
      }
    }
  }

  public reset() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        this._board[i][j] = {
          value: 0,
          canModify: true,
        };
      }
    }
    return this;
  }

  get board() {
    return this._board;
  }

  setCell([row, col]: Position, value: number, canModify = true) {
    this._board[row][col].value = value;
    if (value !== 0) this._board[row][col].canModify = canModify;
  }

  isValid([row, col]: Position, value: number) {
    // Check if the value is valid in the row
    for (let i = 0; i < SIZE; i++) {
      if (i === row || this._board[i][col].value === 0) continue;
      if (this._board[row][col].value === value) return false;
    }

    // Check if the value is valid in the column
    for (let i = 0; i < SIZE; i++) {
      if (i === col || this._board[row][i].value === 0) continue;
      if (this._board[row][col].value === value) return false;
    }

    // Check if the value is valid in the box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i === row && j === col) continue;
        if (this._board[i][j].value === 0) continue;
        if (this._board[i][j].value === value) return false;
      }
    }
    return true;
  }

  randomize() {
    this.reset();
    const count = Math.floor(Math.random() * 10) + 30;
    let i = 0;
    while (i < count) {
      const row = Math.floor(Math.random() * SIZE);
      const col = Math.floor(Math.random() * SIZE);
      const value = Math.floor(Math.random() * SIZE) + 1;
      if (this.isValid([row, col], value)) {
        this.setCell([row, col], value);
        i++;
      }
    }
    return this;
  }

  getPossibleValues([row, col]: Position) {
    // Set of possible values
    const possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // Remove values from the row
    for (let i = 0; i < SIZE; i++) {
      if (i === col || this._board[row][i].value === 0) continue;
      possibleValues.delete(this._board[row][i].value);
    }
    // Remove values from the column
    for (let i = 0; i < SIZE; i++) {
      if (i === row || this._board[i][col].value === 0) continue;
      possibleValues.delete(this._board[i][col].value);
    }
    // Remove values from the box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i === row && j === col) continue;
        if (this._board[i][j].value === 0) continue;
        possibleValues.delete(this._board[i][j].value);
      }
    }
    return [...possibleValues];
  }

  getEmptyCell() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this._board[i][j].value === 0) return [i, j] as Position;
      }
    }
    return undefined;
  }
}