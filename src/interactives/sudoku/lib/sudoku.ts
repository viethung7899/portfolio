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
        this.#board[i][j] = new Cell();
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

  unsetCell(row: number, col: number) {
    const value = this.#board[row][col].value;
    this.#board[row][col].value = 0;
    this.updateRowState(row, col, value, true);
    this.updateColState(row, col, value, true);
    this.updateBoxState(row, col, value, true);
    return this;
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

export const sudoku = writable(new Sudoku());