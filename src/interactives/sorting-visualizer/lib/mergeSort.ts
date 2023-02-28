import type { Item, SortGenerator } from "./types";

function* mergeSort(items: Item[]): SortGenerator {
  yield* mergeSortHelper(items, 0, items.length - 1);
};

function* mergeSortHelper(items: Item[], start: number, end: number, depth = 0): SortGenerator {
  if (start === end) return;
  const mid = start + Math.floor((end - start) / 2);

  yield* mergeSortHelper(items, start, mid, depth + 1);
  yield* mergeSortHelper(items, mid + 1, end, depth + 1);
  yield* merge(items, start, mid, end, depth);
};

function* merge(items: Item[], start: number, mid: number, end: number, depth = 0): SortGenerator {
  const left = items.slice(start, mid + 1);
  const right = items.slice(mid + 1, end + 1);
  let combine: Item[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    left[i].status = right[j].status = "selected";
    yield items;

    if (left[i].value < right[j].value) {
      combine.push(left[i]);
      left[i].status = right[j].status = "none";
      i++;
    } else {
      combine.push(right[j]);
      left[i].status = right[j].status = "none";
      j++;
    }
  }

  while (i < left.length) {
    left[i].status = "selected";
    yield items;
    combine.push(left[i]);
    left[i].status = "none";
    i++;
  }

  while (j < right.length) {
    right[j].status = "selected";
    yield items;
    combine.push(right[j]);
    right[j].status = "none";
    j++;
  }

  for (let i = 0; i < combine.length; i++) {
    items[start + i] = {...combine[i]};
    items[start + i].status = depth === 0 ? "sorted" : "pivot";
    yield items;
    if (depth !== 0) items[start + i].status = "none";
  }
}

export default mergeSort;