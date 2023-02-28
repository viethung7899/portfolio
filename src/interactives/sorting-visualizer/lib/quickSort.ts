import type { Item, SortGenerator } from "./types";

// Hoare's partition scheme
function* partition(items: Item[], low: number, high: number): Generator<Item[], number> {
  const pivot = items[Math.floor((low + high) / 2)];
  pivot.status = "pivot";
  yield items;

  let i = low - 1, j = high + 1;
  const resetStatus = (item: Item) => {
    item.status = "none";
    pivot.status = "pivot";
  }

  while (true) {
    do {
      if (i >= low) resetStatus(items[i]);
      i++;
      items[i].status = "selected";
    } while (items[i].value < pivot.value);
    do {
      if (j <= high) resetStatus(items[j]);
      j--;
      items[j].status = "selected";
    } while (items[j].value > pivot.value);
    if (i >= j) {
      items[i].status = items[j].status = "none";
      pivot.status = "sorted";
      yield items;
      return j;
    }
    // Swap
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
    yield items;
  }
}

function* quickSortHelper(items: Item[], low: number, high: number): SortGenerator {
  if (low < high) {
    const pivot = yield* partition(items, low, high);
    yield* quickSortHelper(items, low, pivot);
    yield* quickSortHelper(items, pivot + 1, high);
  } else if (low == high) {
    items[low].status = "sorted";
    yield items;
  }
};

function* quickSort(items: Item[]): SortGenerator {
  yield* quickSortHelper(items, 0, items.length - 1);
};

export default quickSort;
