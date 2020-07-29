// const task = (num?: number) => {
//   throw new Error(`${num}`);
// }
// let queue: Promise<any> = Promise.resolve(1);

// queue.then((num) => task(num)).catch(console.error).then(() => {
//   console.log('next')
// })
const b = async () => 1;
const a = async () => {
  const e = await b();
  console.log(e);
  return e;
}

(async () => {
  const c = a();
  console.log(c);
})()