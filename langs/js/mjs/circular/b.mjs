import * as a from "./a.mjs";
export const b = 2;
// console.log(a);
export function test() {
    console.log(a.a);
    a.test()
}