import { writable } from "svelte/store";
import { Cell } from "./cell";
import { DIMENSION, SIZE } from "./constants";

export class Sudoku {
  #board: Cell[][];

  constructor() {
    this.#board = [];
    for (let i = 0; i < DIMENSION; i++) {
      this.#board[i] = [];
      for (let j = 0; j < DIMENSION; j++) {
        this.#board[i][j] = new Cell(i, j);
      }
    }
  }

  get board() {
    return this.#board;
  }

  setCell(row: number, col: number, value: number) {
    if (!this.#board[row][col].hasValue(value)) return this;
    this.#board[row][col].value = value;
    this.updateRowState(row, col, value);
    this.updateColState(row, col, value);
    this.updateBoxState(row, col, value);
    return this;
  }

  lockCell(row: number, col: number) {
    this.#board[row][col].isLocked = true;
    return this;
  }

  unlockCell(row: number, col: number) {
    this.#board[row][col].isLocked = false;
    return this;
  }

  unsetCell(row: number, col: number) {
    const value = this.#board[row][col].value;
    this.#board[row][col].value = 0;
    this.updateState(row, col, value, true);

    const other: Cell[] = [];

    for (let r = 0; r < DIMENSION; r++) {
      for (let c = 0; c < DIMENSION; c++) {
        if (r === row && c === col) continue;
        if (this.#board[r][c].value !== value) continue;
        other.push(this.#board[r][c]);
      }
    }

    for (const cell of other) this.updateState(cell.rowIndex, cell.colIndex, value);

    return this;
  }

  reset() {
    const locks = [];
    for (let r = 0; r < DIMENSION; r++) {
      for (let c = 0; c < DIMENSION; c++) {
        if (this.#board[r][c].isLocked) locks.push(this.#board[r][c]);
        else this.unsetCell(r, c);
      }
    }
    for (const lock of locks)
      this.updateState(lock.rowIndex, lock.colIndex, lock.value);
    return this;
  }

  private updateState(row: number, col: number, value: number, unset: boolean = false) {
    this.updateRowState(row, col, value, unset);
    this.updateColState(row, col, value, unset);
    this.updateBoxState(row, col, value, unset);
  }

  private updateRowState(row: number, col: number, value: number, unset: boolean = false) {
    for (let c = 0; c < DIMENSION; c++) {
      if (c === col) continue;
      if (unset) this.#board[row][c].addValue(value);
      else this.#board[row][c].removeValue(value);
    }
  }

  private updateColState(row: number, col: number, value: number, unset: boolean = false) {
    for (let r = 0; r < DIMENSION; r++) {
      if (r === row) continue;
      if (unset) this.#board[r][col].addValue(value);
      else this.#board[r][col].removeValue(value);
    }
  }

  private updateBoxState(row: number, col: number, value: number, unset: boolean = false) {
    const rowStart = row - row % SIZE;
    const colStart = col - col % SIZE;

    for (let r = rowStart; r < rowStart + SIZE; r++) {
      for (let c = colStart; c < colStart + SIZE; c++) {
        if (r === row && c === col) continue;
        if (unset) this.#board[r][c].addValue(value);
        else this.#board[r][c].removeValue(value);
      }
    }
  }
}

export const randomizeSoduoku = () => {
  const sudoku = new Sudoku();
  const count = Math.floor(Math.random() * 10) + 20;
  for (let i = 0; i < count; i++) {
    const row = Math.floor(Math.random() * DIMENSION);
    const col = Math.floor(Math.random() * DIMENSION);
    if (sudoku.board[row][col].isLocked) continue;
    const possibleValues = sudoku.board[row][col].possibleValues;
    if (possibleValues.length === 0) continue;
    const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    sudoku.setCell(row, col, value).lockCell(row, col);
  }
  return sudoku;
}

export const sudoku = writable(new Sudoku());
export const showPossibleValues = writable(false);