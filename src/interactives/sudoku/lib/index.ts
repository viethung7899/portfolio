import backtracking from "./backtracking";
import dancingLink from "./dancingLink";

export const algorithms = {
  "Backtracking": backtracking,
  "Dancing Link": dancingLink
}

export type AlgorithmName = keyof typeof algorithms;
export type Algorithm = ReturnType<typeof algorithms[AlgorithmName]>;