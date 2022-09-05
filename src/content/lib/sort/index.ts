import bubbleSort from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import type { Item, SortGenerator } from "./types";

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

type SortingState = ReturnType<SortGenerator["next"]>

export {
  type Item,
  randomizeArray,
  sleep,
  algorithms,
  type SortingState
};
