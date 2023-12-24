// class test {
//     a
//     b
//     c
//     d = 1
// }
// const x = new test
// console.log()

let sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin, // (或者，我们可以在这儿使用 Object.setPrototypeOf 来设置原型)

    sayHi() {
        // 调用父类方法
        super.say(`Hello ${this.name}`); // (*)
    },
    sayBye: () => {
        this.say(`Bye ${this.name}`); // (*)
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了
new User("Dude")["sayHi"](); // Hello Dude!