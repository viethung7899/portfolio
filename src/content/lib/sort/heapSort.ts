import type { Item, SortGenerator } from "./types";

function* heapSort(items: Item[]): SortGenerator {
  const size = items.length;

  for (let i = Math.floor(size / 2); i >= 0; i--) {
    yield* heapify(items, size, i);
  }

  for (let i = size - 1; i > 0; i--) {
    // Swap
    items[0].status = items[i].status = "selected";
    const tmp = items[0];
    items[0] = items[i];
    items[i] = tmp;
    tmp.status = "sorted";
    items[0].status = "none";
    yield items;
    yield* heapify(items, i, 0);
  }

  items[0].status = "sorted";
  yield items;
}

function* heapify(items: Item[], size: number, root: number): SortGenerator {
  let largest = root,
    left = 2 * root + 1,
    right = 2 * root + 2;

  if (left < size && items[largest].value < items[left].value) {
    largest = left;
  }

  if (right < size && items[largest].value < items[right].value) {
    largest = right;
  }

  if (largest !== root) {
    // Swap
    items[root].status = items[largest].status = "selected";
    yield items;
    const tmp = items[root];
    items[root] = items[largest];
    items[largest] = tmp;
    yield items;
    items[root].status = items[largest].status = "none";
    yield* heapify(items, size, largest);
  }
}

export default heapSort;
