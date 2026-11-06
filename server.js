const express = require('express');
const app = express();

app.use(express.json());

const projetosRoutes = require('./routes/projetos');
const tratarErros = require('./middlewares/tratarErros');

app.use('/projetos', projetosRoutes);

app.get('/', (req, res) => {
    res.json({
        nome: "Fagner",
        perfil: "Desenvolvedor",
        foco: "JavaScript, Node.js e React",
        mensagem: "Bem-vindo à API do meu portfólio!"
    });
});

app.use(tratarErros);

app.listen(3000, () => {
    console.log("Servidor do portfólio rodando na porta 3000! 🚀");
});