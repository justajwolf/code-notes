var obj = {};
Object.defineProperty(obj, "a", {
    configurable: false,
    enumerable: false,
    value: 10,
    writable: false,
});

var p = new Proxy(obj, {
    get: function (target, prop) {
        return 20;
    },
});

//会抛出 TypeError: 非法篡改 a的只读值 10
console.log(p.a)