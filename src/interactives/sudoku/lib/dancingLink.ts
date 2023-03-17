import { DancingLink } from "./dlx/DancingLink";
import type Sudoku from "./sudoku";
import { BOX_SIZE, SIZE } from "./sudoku";

const ROWS = SIZE * SIZE * SIZE;
const COLS = SIZE * SIZE * 4;

function index(row: number, col: number, value: number) {
  return (row * SIZE + col) * SIZE + (value - 1);
}

function createCoverMatrix(sudoku: Sudoku) {
  let matrix: boolean[][] = [];
  for (let i = 0; i < ROWS; i++) {
    matrix.push([]);
    for (let j = 0; j < COLS; j++) matrix[i].push(false);
  }

  // Make constraint
  let columnIndex = 0;

  // Region constraints
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++, columnIndex++) {
      for (let val = 1; val <= SIZE; val++)
        matrix[index(row, col, val)][columnIndex] = true;
    }
  }

  // Row constraints
  for (let row = 0; row < SIZE; row++) {
    for (let val = 1; val <= SIZE; val++, columnIndex++) {
      for (let col = 0; col < SIZE; col++)
        matrix[index(row, col, val)][columnIndex] = true;
    }
  }

  // Column constraints
  for (let col = 0; col < SIZE; col++) {
    for (let val = 1; val <= SIZE; val++, columnIndex++) {
      for (let row = 0; row < SIZE; row++)
        matrix[index(row, col, val)][columnIndex] = true;
    }
  }

  // Box constraints
  for (let row = 0; row < SIZE; row += BOX_SIZE) {
    for (let col = 0; col < SIZE; col += BOX_SIZE) {
      for (let val = 1; val <= SIZE; val++, columnIndex++) {
        for (let rowD = 0; rowD < BOX_SIZE; rowD++) {
          for (let colD = 0; colD < BOX_SIZE; colD++) {
            matrix[index(row + rowD, col + colD, val)][columnIndex] = true;
          }
        }
      }
    }
  }

  // Use matrix board
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const val = sudoku.board[row][col].value;
      if (val === 0) continue;
      for (let num = 1; num <= SIZE; num++) {
        if (num == val) continue;
        for (let i = 0; i < COLS; i++)
          matrix[index(row, col, val)][i] = false;
      }
    }
  }

  return matrix;
}

export default function dancingLink(sudoku: Sudoku) {
  const matrix = createCoverMatrix(sudoku);
  const dlx = new DancingLink(matrix);
  dlx.solve(true);
}