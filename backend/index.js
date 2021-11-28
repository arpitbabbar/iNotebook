const connect = require('./db');
const express = require('express')

connect();
const app = express()
const port = 3000

app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res) => {
//     res.send('Hello Bro!')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})