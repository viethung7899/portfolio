import bubbleSort from "./bubbleSort";
import heapSort from "./heapSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import { selectionSort } from "./selectionSort";
import type { Item, SortGenerator } from "./types";

export type { Item, SortGenerator };

export const randomizeArray = (count: number) => {
  return Array.from({ length: count }, () => ({
    value: Math.ceil(Math.random() * 100),
    status: "none"
  }) as Item);
};

export const algorithms = {
  "Bubble sort": bubbleSort,
  "Selection sort": selectionSort,
  "Insertion sort": insertionSort,
  "Merge sort": mergeSort,
  "Quicksort": quickSort,
  "Heap sort": heapSort
}

export type Algorithm = keyof typeof algorithms

export type SortingState = ReturnType<SortGenerator["next"]>