
const express = require('express');
const projetosRoutes = require('./routes/projetos');
const tratarErros = require('./middlewares/tratarErros');

const app = express();

app.use(express.json());

app.use('/projetos', projetosRoutes);

app.use(tratarErros);

module.exports = app;
