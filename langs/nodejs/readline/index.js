const readline = require('node:readline/promises');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

(async () => {
    const answer = await rl.question('What is your favorite food? ');
    console.log(`Oh, so your favorite food is ${answer}`);
    console.log("end")
    rl.close();
})()