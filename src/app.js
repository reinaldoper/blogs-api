const express = require('express');
const bodyParser = require('body-parser');

// ...

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
const getAllPost = require('./controllers/getAllPost');
const getPostId = require('./controllers/getPostId');
const login = require('./controllers/login');
const getUsers = require('./controllers/getUsers');
const getUserId = require('./controllers/getUserId');
const createUser = require('./controllers/createUser');
const validaLogin = require('./auth/validaLogin');
const validaUser = require('./auth/validaUser');
const createCategory = require('./controllers/createCategory');
const getAllCategory = require('./controllers/getAllCategory');
const createBlogPost = require('./controllers/createBlogPost');
const validaBolg = require('./auth/validaBolg');

app.get('/post/:id', getPostId);
app.post('/post', validaBolg, createBlogPost);
app.post('/login', validaLogin, login);
app.post('/user', validaUser, createUser);
app.get('/user', getUsers);
app.get('/user/:id', getUserId);
app.post('/categories', createCategory);
app.get('/categories', getAllCategory);
app.get('/post', getAllPost);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
