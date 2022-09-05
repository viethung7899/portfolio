import bubbleSort from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import type { Item } from "./types";

const randomizeArray = (count: number) => {
  return Array.from({ length: count }, () => ({
    value: Math.ceil(Math.random() * 100),
    status: "none"
  }) as Item);
};

const sleep = async (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const algorithms = {
  "Bubble sort": bubbleSort,
  "Selection sort": selectionSort
}

export {
  type Item,
  randomizeArray,
  sleep,
  algorithms,
};
