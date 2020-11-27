// const test = (a, b, c) => {};
// console.log(test.length);

// const count = (uniqueId: string) => {
//   let sum = 0;
//   for (let i=0; i<uniqueId.length; i++) {
//     sum += uniqueId.charCodeAt(i);
//   }
//   console.log(sum, sum%100);
// }
// count('8D482DB5-E0D1-5A18-A151-17BC24FF3D52')

// function version2VersionSort(v) {
//   return v.split('.').reduce(function(v_sort, num) {
//     v_sort.push(num.padStart(5, 0));
//     return v_sort;
//   }, []).join('.');
// }
// console.log(version2VersionSort('1.0.0.10'));

const list = JSON.parse('[{"v":"1.1.1.0","v_sort":"00001.00001.00001.00000"},{"v":"0.0.0.1","v_sort":"00000.00000.00000.00001"},{"v":"1.1.1.1","v_sort":"00001.00001.00001.00001"}]');
const a = list.sort((a, b) => {
  if (b.v_sort > a.v_sort) {
    return 1;
  } else if (b.v_sort < a.v_sort) {
    return -1;
  }
  return 0;
});
console.log(a);