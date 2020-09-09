export const partition = (arr, low, high) => {
  const pivot = arr[low];
  while(low < high) {
    while(low<high && arr[high]>pivot) high--;
    arr[low] = arr[high];
    while(low<high && arr[low]<pivot ) low++;
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

export const sort = (arr, low, high) => {
  if (low >= high) return;
  const pivot_index = partition(arr, low, high);
  sort(arr, low, pivot_index);
  sort(arr, pivot_index+1, high);
}

//3.数据测试
const arr = [6,7,8,4,5,9,3,0,2,1];
sort(arr, 0, arr.length-1);
console.log(arr);