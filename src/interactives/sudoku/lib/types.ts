import type Sudoku from "./sudoku";

export type SudokuSolvingGenerator = Generator<Sudoku, boolean>;
export type SudokuSolvingState = ReturnType<SudokuSolvingGenerator["next"]>;