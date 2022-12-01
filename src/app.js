const express = require('express');
const bodyParser = require('body-parser');

// ...

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
const login = require('./controllers/login');
const getUsers = require('./controllers/getUsers');
const createUser = require('./controllers/createUser');
const validaLogin = require('./auth/validaLogin');
const validaUser = require('./auth/validaUser');

app.post('/login', validaLogin, login);
app.post('/user', validaUser, createUser);
app.get('/user', getUsers);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
