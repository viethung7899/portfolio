export type Item = {
  value: number;
  status: "none" | "selected" | "sorted" | "pivot";
};

export type SortGenerator = Generator<Item[], void>;
