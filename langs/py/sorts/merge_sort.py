## 归并排序(2路归并)
# 1.合并数组
def merge(list, low, mid, high):
    temp = list[low:high+1]
    mid = mid-low; high = high-low
    i = 0; j = mid+1; k = low
    while True:
        if i<=mid and j<=high:
            if temp[i] > temp[j]:
                list[k] = temp[j]; j += 1
            else:
                list[k] = temp[i]; i += 1
            k += 1
        else: break
    while i <= mid: 
        list[k] = temp[i]
        k += 1; i += 1
    while j <= high: 
        list[k] = temp[j]
        k += 1; j += 1
# 2.归并划分
def mergeSort(list, low, high):
    if low < high:
        mid = low+(high-low)//2
        mergeSort(list, low, mid)
        mergeSort(list, mid+1, high)
        merge(list, low, mid, high)

#数据测试
list = [9,7,6,4,0,3,1,5,8,2]
mergeSort(list,0,len(list)-1)
print(list)
