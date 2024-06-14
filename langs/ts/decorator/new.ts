function loggedMethod(originalMethod: any, _context: any) {

    function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.")
        const result = originalMethod.call(this, ...args);
        console.log("LOG: Exiting method.")
        return result;
    }

    return replacementMethod;
}
// @ts-ignore
Symbol["metadata"] ??= "aaaaaaaaaaaaaaaaaa"
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    @loggedMethod
    private greet(a: string) {
        console.log(`Hello, my name is ${this.name}.`);
    }

    @loggedMethod
    hello() {
        this.greet("aaaaa");
    }
}

const p = new Person("Ron");
p.hello();

console.log(Person["aaaaaaaaaaaaaaaaaa"])

// Output:
//
//   LOG: Entering method.
//   Hello, my name is Ron.
//   LOG: Exiting method.
