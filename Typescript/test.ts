// const task = (num?: number) => {
//   throw new Error(`${num}`);
// }
// let queue: Promise<any> = Promise.resolve(1);

// queue.then((num) => task(num)).catch(console.error).then(() => {
//   console.log('next')
// })
// const b = async () => 1;
// const a = async () => {
//   const e = await b();
//   console.log(e);
//   return e;
// }

// (async () => {
//   const c = a();
//   console.log(c);
// })()

const test2 = (nums) => {
  if (nums.length < 3) return true;
  const asc = [[nums[0]]];
  let cursor = asc[0];
  for(let i=1; i<nums.length; i++) {
    if (cursor[cursor.length-1] <= nums[i]) {
      cursor.push(nums[i]);
      continue;
    }
    cursor = [nums[i]];
    asc.push(cursor);
  }
  console.log(asc);
  if (asc.length > 2) return false;
  switch(asc.length) {
    case 1: return true;
    case 2: 
      if (asc[0].length === 1 || asc[1].length === 1) return true;
      const min = asc[0][asc[0].length - 1];
      const max = asc[1][asc[1].length - 1];
      if (max < min) return false;
      if (asc[1].length === 2) return true;
      // for(const num of asc[0]) {
      //   num > max && ++count;
      //   if (count > 1) return false;
      // }
      return true;
    default: return false;
  }
}

console.log(test2([3,4,2,3]));
console.log();