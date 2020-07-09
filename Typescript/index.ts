let queue: Promise<any> = Promise.resolve(0);
const task = async (i: number) => {
  queue = queue.then((res) => {
    console.log(`这是第${res}个结果`)
    return new Promise((resolve) => {
      console.log(`创建第${i}个Promise`);
      setTimeout(() => resolve(i), 500);
    });
  })
  return queue;
}

(() => {
  const tasks = [];
  for(let i=1; i<=10; i++) {
    task(i).then(i => console.log(i));
    // tasks.push(task(i));
  }
  // Promise.all(tasks).then(list => {
  //   list.forEach(i => console.log(i));
  // });
})()