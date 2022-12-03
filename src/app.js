const express = require('express');
const bodyParser = require('body-parser');

// ...

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
const updatePost = require('./controllers/updatePost');
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
const validaUpdate = require('./auth/validaUpdate');
const deletePost = require('./controllers/deletePost');
const validaDelete = require('./auth/validaDelete');
const deleteUser = require('./controllers/deleteUser');

app.get('/post/:id', getPostId);
app.post('/post', validaBolg, createBlogPost);
app.post('/login', validaLogin, login);
app.post('/user', validaUser, createUser);
app.get('/user', getUsers);
app.get('/user/:id', getUserId);
app.post('/categories', createCategory);
app.get('/categories', getAllCategory);
app.get('/post', getAllPost);
app.put('/post/:id', validaUpdate, updatePost);
app.delete('/post/:id', validaDelete, deletePost);
app.delete('/user/me', deleteUser);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
