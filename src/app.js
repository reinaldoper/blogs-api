const express = require('express');
const bodyParser = require('body-parser');

// ...

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
const login = require('./controllers/login');
const validaLogin = require('./auth/validaLogin');

app.post('/login', validaLogin, login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
