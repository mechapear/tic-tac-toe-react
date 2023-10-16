/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Clone an array by ensuring it's the fastest way to do it
 */
export function cloneArr<Data>(arr: Data[]): Data[] {
  return arr.slice(0)
}
