async function $(pieces, ...args) {

    console.log(pieces);

    return args;
}

const person = "Mike";
const age = 28;
const result = await $`That ${person} is a ${age}.`;

console.log(result);