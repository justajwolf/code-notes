export const min = -Math.pow(2, 31);
export const max = -min - 1;
export const reverse = function(x, sum = 0) {
    if (sum <= min || sum >= max) return 0;
    if (x === 0) return sum;
    return reverse(~~(x/10), sum * 10 + x % 10);
};

console.log(reverse(123));
console.log(reverse(-123));