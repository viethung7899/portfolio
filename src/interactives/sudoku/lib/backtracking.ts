import type Sudoku from "./sudoku";
import type { Position } from "./sudoku";

export default function* backtracking(sudoku: Sudoku): Generator<Sudoku, boolean> {
  // Base case (no empty cells)
  const position = sudoku.getEmptyCell();
  if (!position) return true;

  // Get the first empty cell
  const values = sudoku.getPossibleValues(position);
  for (const value of values) {
    // Set the cell to the value
    sudoku.setCell(position, value, false);
    yield sudoku;

    // Recurse
    const solved = yield* backtracking(sudoku);
    if (solved) return true;
    yield sudoku;
    
  }
  // Reset the cell
  sudoku.setCell(position, 0);
  return false;
}
