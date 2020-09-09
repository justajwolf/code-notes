export const buddyStrings = function(A: string, B: string) {
  // 1.长度不等false
  if (A.length !== B.length) return false;
  // 2.对位比较不相等的数量
  let diffnum = 0;
  // 3.记录每个字符串去重过之后不同字符数量
  let a = Object.create(null);
  let b = Object.create(null);
  // 4.遍历
  for (let i=0; i<A.length; i++) {
    a[A[i]] ? a[A[i]]++ : a[A[i]] = 1;
    b[B[i]] ? b[B[i]]++ : b[B[i]] = 1;
    A[i] !== B[i] && ++diffnum;
    if (diffnum > 2) break;
  }
  // 5.只对完全相同的串和只有两个位置不同的串进行判断，其余全是false
  switch (diffnum) {
    case 2: 
        for(const k of Object.keys(a)) {
            if (a[k] !== b[k]) return false;
        }
        return true;
    case 0: return Object.values(a).find(n => n > 1) ? true : false;
    default: return false;
  }
};

console.log(buddyStrings('abc', 'bca'));