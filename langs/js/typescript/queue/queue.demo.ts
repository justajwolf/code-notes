let queue: Promise<any> = Promise.resolve(0);
export const task = async (i: number) => {
  queue = queue.then((res) => {
    console.log(`这是第${res}个结果`)
    return new Promise((resolve) => {
      console.log(`创建第${i}个Promise`);
      setTimeout(() => resolve(i), 500);
    }).catch((err) => console.log(`err: ${err}`));
  })
  return queue;
}

const asyncTask = async (fn) => fn(); 
function test1() {
  const tasks = [];
  for(let i=1; i<=10; i++) {
    asyncTask(() => task(i).then(i => console.log(i)));
    // tasks.push(task(i));
  }
  // Promise.all(tasks).then(list => {
  //   list.forEach(i => console.log(i));
  // });
}
// test1();

function test2() {
  const tasks = [];
  const p = task(1);
  asyncTask(() => p.then(i => console.log(i)));
  asyncTask(async () => {
    console.log(`async: ${await p}`);
  })
}
// test2();

// (Promise.resolve() as Promise<any>)
// .then(() => {
//   console.log('first')
//   // return 'ok'
//   throw new Error('1')
// }).then((...a) => {
//   console.log('second')
//   console.log(a);
// })

