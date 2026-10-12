const express = require('express'); //Importa o Express
const app = express(); //Cria o servidor do portfólio
//ensina o express a ler JSON no corpo da requisição
app.use(express.json());

//Importando as rotas do arquivo routes/projetos.js
const projetosRoutes = require('./routes/projetos');
const router = require('./routes/projetos');
app.use('/projetos', projetosRoutes);


//rota para listar todos os projetos
app.get('/projetos', (req, res) => {
    res.json(meusProjetos);
});

//Criando a rota principal API
router.get('/', (req, res) => {
    res.json({
        nome: "Fagner",
        perfil: "Desenvolvedor",
        foco: "JavaScript, Node.js e React",
        mensagem: "Bem-vindo à API do meu portfólio!"
    });
});

// 4. Ligando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor do portfólio rodando na porta 3000! 🚀");
});