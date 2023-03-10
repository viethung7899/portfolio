export type CellPosition = [number, number, number];
export const equal = ([x1, y1, z1]: CellPosition, [x2, y2, z2]: CellPosition) => {
  return x1 === x2 && y1 === y2 && z1 === z2;
}

const REGIONS = 9;
const ROWS = 3;
const COLS = 3;

export default class Sodoku {
  constructor() {
    this._board = new Array(REGIONS);
    for (let i = 0; i < 9; i++) {
      this._board[i] = new Array(ROWS);
      for (let j = 0; j < 3; j++) {
        this._board[i][j] = new Array(COLS);
        for (let k = 0; k < 3; k++) {
          this._board[i][j][k] = 0;
        }
      }
    }
  }

  private _board: number[][][];

  get board() {
    return this._board;
  }

  private checkRegion([region, row, col]: CellPosition, value: number) {
    let values: number[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if ((i !== row || j !== col) && this._board[region][i][j] !== 0) {
          values.push(this._board[region][i][j]);
        }
      }
    }
    return values.indexOf(value) === -1;
  }

  private checkRow([region, row, col]: CellPosition, value: number) {
    let values: number[] = [];
    let regionRows = region % 3;
    for (let i = 0; i < 3; i++) {
      const r = regionRows * 3 + i;
      for (let j = 0; j < 3; j++) {
        if ((r !== region || j !== col) && this._board[r][row][j] !== 0) {
          values.push(this._board[r][row][j]);
        }
      }
    }
    return values.indexOf(value) === -1;
  }

  private checkCol([region, row, col]: CellPosition, value: number) {
    let values: number[] = [];
    let regionCols = region % 3;
    for (let i = 0; i < 3; i++) {
      const c = regionCols * 3 + i;
      for (let j = 0; j < 3; j++) {
        if ((c !== region || j !== row) && this._board[c][j][col] !== 0) {
          values.push(this._board[c][j][col]);
        }
      }
    }
    return values.indexOf(value) === -1;
  }

  public setValue([region, row, col]: CellPosition, value: number) {
    this._board[region][row][col] = value;
    return this;
  }

  public isValid() {
    for (let region = 0; region < REGIONS; region++) {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const value = this._board[region][row][col];
          const pos = [region, row, col] as CellPosition;
          if (!this.isValidCell(pos, value)) return false;
        }
      }
    }
    return true;
  }

  public isValidCell(pos: CellPosition, value: number) {
    if (value !== 0) {
      if (!this.checkRegion(pos, value))
        return false;
      if (!this.checkRow(pos, value))
        return false;
      if (!this.checkCol(pos, value))
        return false;
    }
    return true;
  }

  public reset() {
    for (let region = 0; region < REGIONS; region++) {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          this._board[region][row][col] = 0;
        }
      }
    }
    return this;
  }

  public randomize() {
    this.reset();
    const count = Math.floor(Math.random() * 10 + 10);
    let i = 0;
    while (i < count) {
      const region = Math.floor(Math.random() * 9);
      const row = Math.floor(Math.random() * 3);
      const col = Math.floor(Math.random() * 3);
      const value = Math.floor(Math.random() * 9 + 1);

      const pos = [region, row, col] as CellPosition;
      if (this.isValidCell(pos, value)) {
        this.setValue(pos, value);
        i++;
      }
    }
    return this;
  }
}