const express = require('express') //require the express package
const app = express() //create an app using the express package
const port = 3000 // set the port to 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('This is a test')
    })

app.listen(port, () => {
console.log(`Example app listening
at http://localhost:${port}`)
})