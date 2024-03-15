/** test bind 参数 */
function add(a = 0, b = 0, c = 0) {
    return a + b + c;
}
const tmp = add.bind(null, 1);
console.log(tmp(2))