function func() {
    try {
        return 1;
    } catch (err) {
        /* ... */
    } finally {
        console.log('finally');
    }
}

console.log(func());