const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// To check that is working 
app.get('/', (req, res, next) => {
    res.send('Hello world again!');
})

app.listen(3000);