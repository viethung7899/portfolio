import type { Item, SortGenerator } from "./types";

export function* bubbleSort(items: Item[]): SortGenerator {
  const n = items.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Pick elements
      items[j].status = "selected";
      items[j + 1].status = "selected";
      yield items;

      // Compare and swap
      if (items[j].value > items[j + 1].value) {
        const temp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = temp;
        swapped = true;
        yield items;
      }

      // Unpick elements
      items[j].status = "none";
      items[j + 1].status = "none";
    }
    if (!swapped) break;
    else {
      items[n - i - 1].status = "sorted"
      yield items;
    }
  }
  items.forEach(item => item.status = "sorted");
  yield items;
}

export default bubbleSort;
