import type { Item, SortGenerator } from "./types";

export function* selectionSort(items: Item[]): SortGenerator {
  const size = items.length;

  for (let step = 0; step < size - 1; step++) {
    let minIndex = step;
    items[minIndex].status = "pivot";
    yield items;
    for (let i = step + 1; i < size; i++) {
      // Select element
      items[i].status = "selected";
      yield items;
      if (items[i].value < items[minIndex].value) {
        // Highlight the minimum
        items[i].status = "pivot";
        items[minIndex].status = "none";
        minIndex = i;
        yield items;
      } else {
        items[i].status = "none";
      }
    }

    // Put min at the correct position
    const temp = items[step];
    items[step] = items[minIndex];
    items[minIndex] = temp;
    items[step].status = "sorted";
    yield items;
  }
  items[size - 1].status = "sorted";
  yield items;
}