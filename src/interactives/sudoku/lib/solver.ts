import { pickRandom } from "@interactives/common/utils";
import type { Sudoku } from "./sudoku";
import { writable } from "svelte/store";

export type SudokuSolvingGenerator = Generator<Sudoku, boolean>;
export type SudokuSolvingState = ReturnType<SudokuSolvingGenerator["next"]>;

function* backtracking(sudoku: Sudoku): SudokuSolvingGenerator {
  const emptyCells = sudoku.board.flat().filter(cell => cell.value === 0);
  if (emptyCells.length === 0) return true;
  const cell = emptyCells[0];
  const values = cell.possibleValues;

  for (const value of values) {
    yield sudoku.setCell(cell.rowIndex, cell.colIndex, value);
    const solved = yield* backtracking(sudoku);
    if (solved) return true;
    yield sudoku.unsetCell(cell.rowIndex, cell.colIndex);
  }

  return false;
}


function* waveFunctionCollapse(sudoku: Sudoku): SudokuSolvingGenerator {
  const emptyCells = sudoku.board.flat().filter(cell => cell.value === 0);
  if (emptyCells.length === 0) return true;
  const counts = emptyCells.map(cell => cell.possibleValues.length);
  const minStateCount = Math.min(...counts);
  if (minStateCount === 0) return false;
  const cells = emptyCells.filter((_, i) => counts[i] === minStateCount);
  const cell = pickRandom(cells);
  const values = cell.possibleValues;
  for (const value of values) {
    yield sudoku.setCell(cell.rowIndex, cell.colIndex, value);
    const solved = yield* waveFunctionCollapse(sudoku);
    if (solved) return true;
    sudoku.unsetCell(cell.rowIndex, cell.colIndex);
  }
  return false;
}

export const algorithm = {
  "Backtracking": backtracking,
  "Wave Function Collapse": waveFunctionCollapse
} as const;

export type SudokuAlgorithm = keyof typeof algorithm;

export const solving = writable(false);
export const noSolution = writable(false);