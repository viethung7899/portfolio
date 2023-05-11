import { writable } from "svelte/store";

export const primaryHSL = writable('0 0% 0%');
export const primaryContentHSL = writable('0 0% 0%');
export const baseContentHSL = writable('0 0% 0%');
export const secondaryHSL = writable('0 0% 0%');

export const setTheme = () => {
  const style = getComputedStyle(document.documentElement);
  primaryHSL.set(style.getPropertyValue('--p'));
  baseContentHSL.set(style.getPropertyValue('--bc'));
  primaryContentHSL.set(style.getPropertyValue('--pc'));
  secondaryHSL.set(style.getPropertyValue('--s'));
}