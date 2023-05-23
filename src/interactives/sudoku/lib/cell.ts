import { shuffle } from "@interactives/common/utils";
import { DIMENSION, ENCODED_STATE } from "./constants";

export class Cell {
  #value = 0;
  #state = ENCODED_STATE;
  isLocked = false;
  readonly rowIndex: number;
  readonly colIndex: number;

  constructor(rowIndex: number, colIndex: number) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }

  get state() {
    return this.#state;
  }

  get value() {
    return this.#value;
  }

  set value(value: number) {
    this.#value = value;
  }

  get possibleValues() {
    const values: number[] = [];
    if (this.value !== 0) return values;
    for (let i = 1; i <= DIMENSION; i++) {
      if (this.hasValue(i)) values.push(i);
    }
    return shuffle(values);
  }

  removeValue(value: number) {
    this.#state &= ~(1 << (value - 1));
  }

  addValue(value: number) {
    this.#state |= 1 << (value - 1);
  }

  hasValue(value: number) {
    return (this.#state & (1 << (value - 1))) !== 0;
  }
}