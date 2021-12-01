const express = require('express');
const path = require('path');
const routers = require('./routers/index.js');

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routers);

app.listen(3000, () => {
  console.log('running in 127.0.0.1:3000');
});
