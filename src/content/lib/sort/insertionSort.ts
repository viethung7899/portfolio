import type { Item, SortGenerator } from "./types";

function* insertionSort(items: Item[]): SortGenerator {
  const size = items.length;

  // Mark the first as sorted;
  items[0].status = "sorted";
  yield items;

  for (let i = 1; i < size; i++) {
    const item = items[i];
    item.status = "pivot";
    yield items;

    let j = i - 1;
    while (j >= 0 && items[j].value > items[j+1].value) {
      // swap
      const temp = items[j];
      items[j] = items[j+1];
      items[j+1] = temp;
      yield items;
      j--;
    }
    item.status = "sorted";
    yield items;
  }
}

export default insertionSort;