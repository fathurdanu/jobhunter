require('dotenv').config();

const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}))

const routes = require('./routes');
app.use(routes);

app.use('/images',express.static('./images/'));
const errHandling = require('./middlewares/error');
app.use(errHandling);

app.listen(port,() => {
    console.log(`port : ${port}`)
})