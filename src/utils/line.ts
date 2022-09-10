export type LineNumber = number | [number, number];

export const convertLineNumbers = (lines: LineNumber[]) => {
  return lines.map(line => {
    if (typeof line === "number")
      return line;
    else {
      const [start, end] = line;
      return [...range(start, end + 1)];
    }
  }).flat();
}

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}
