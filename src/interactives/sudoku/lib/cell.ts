import { ENCODED_STATE, DIMENSION } from "./constants";

export class Cell {
  value = 0;
  #state = ENCODED_STATE;
  stateCount = DIMENSION;

  get state() {
    return this.#state;
  }

  removeValue(value: number) {
    this.#state &= ~(1 << (value - 1));
    this.stateCount--;
  }

  addValue(value: number) {
    this.#state |= 1 << (value - 1);
    this.stateCount++;
  }

  hasValue(value: number) {
    return (this.#state & (1 << (value - 1))) !== 0;
  }
}