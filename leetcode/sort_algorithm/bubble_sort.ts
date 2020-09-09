/**
 * 冒泡排序
 */
export const sort = (list) => {
  for (let i=0, len=list.length; i<len; i++) {
    for (let j=0; j<len-1-i; j++) {
      if (list[j] > list[j+1]) {
        const temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
    }
  }
}

// 测试
const arr = [6,7,8,4,5,9,3,0,2,1];
sort(arr);
console.log(arr);