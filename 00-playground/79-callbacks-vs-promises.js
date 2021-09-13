const doWorkCallBack = (callback) => {
    setTimeout(() => {
        const num = Math.random()
        if (num > 0.5) {
            callback('This is my error', undefined)
        } else {
            callback(undefined, [1, 4, 7])
        }
        // This is where asyncrhonous task ends and we indicate to caller the result
    }, 2000)
}

doWorkCallBack((error, result) => {
    if (error) {
        return console.log('Error: ', error)
    } 
        
    console.log('Result: ', result)
})

// KEY TAKEAWAYS
// 1) Order we enter arguments in from the top function is important
// 2) We need conditional logic when we call the function
// 3) There is no rules stopping me calling the callback multiple times or returning
// both success and error at the same time