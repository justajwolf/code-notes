fmtTest(2, 3, 1)
fmtTest(3, 1, 0)
function fmtTest(m, n, k) {
  console.log(`输入：m = ${m}, n = ${n}, k = ${k}`)
  console.log(`输出：${movingCount(m, n, k)}`)
}

/**
 * DFS深搜
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function movingCount(m, n, k) {
  // 标记走过的坐标
  const mark = {};
  return move(0, 0);
  function move(x, y) {
    // 边界结束
    if (x >= m || y >= n || x < 0 || y < 0) {
      return 0;
    }
    // 走过的坐标
    const key = `${x},${y}`;
    if (mark[key]) {
      return 0;
    }
    // 不满足条件的坐标
    if (sum(x) + sum(y) > k) {
      return 0;
    }
    mark[key] = true
    let count = 1;
    // 只需要向两个方向去搜索就行，，，
    // count += move(x - 1, y); // 向上
    // count += move(x, y - 1); // 向左
    count += move(x + 1, y);  // 向下
    count += move(x, y + 1);  // 向右
    return count;
  }
  function sum(num) {
    let count = 0;
    while (num) {
      count += num % 10;
      // num = ~~(num / 10);
      num = parseInt(num / 10);
    }
    return count;
  }
}
