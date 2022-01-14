const connect = require('./db');
const express = require('express')
const cors = require('cors');

connect();
const app = express()
const port = 5000

app.use(express.json());
app.use(cors());
//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res) => {
//     res.send('Hello Bro!')
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})