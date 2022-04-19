let promise = new Promise((resolve, reject) => {
    resolve()
}) 

promise
    .then(() => {
        console.log('Successfully !');
    })