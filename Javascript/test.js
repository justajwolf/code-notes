new Promise((resolve, reject) => {
    reject('abc');
}).then((a) => {
}).catch((err) => {
    console.log();
})