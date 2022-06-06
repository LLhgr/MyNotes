const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
require('./config/dbConfig');

app.use(cors());
//Recurso para o express utilizar o json nas requisições
app.use(express.json());
app.use(routes);

app.listen(3333);

