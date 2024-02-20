async function test1() {
    // 创建一个 thenable 对象  
    const thenable = {
        value: 'Hello, world!',
        then(onFulfilled, onRejected) {
            // 调用 onFulfilled 回调函数，并传递解析值  
            onFulfilled(this.value);
        }
    };

    // 创建一个异步函数  
    async function fetchValue() {
        try {
            // 使用 await 从 thenable 对象中取值  
            const value = await thenable;
            console.log(value); // 输出：Hello, world!  
        } catch (error) {
            console.error(error);
        }
    }

    // 调用异步函数  
    fetchValue();
}

test1();