let promise = Promise.resolve(1);
for (const i of [1,2,3,4]) {
  promise = promise.then(n => {
    console.log(i, n);
    return i;
  });
}