function loggedMethod(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function replacementMethod(this: any, ...args: any[]) {
        console.log("LOG: Entering method.")
        const result = method.call(this, ...args);
        console.log("LOG: Exiting method.")
        return result;
    }

    return descriptor
}
export class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    @loggedMethod
    greet() {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const p = new Person("Ron");
p.greet();

// Output:
//
//   LOG: Entering method.
//   Hello, my name is Ron.
//   LOG: Exiting method.
