export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export const pickRandom = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];