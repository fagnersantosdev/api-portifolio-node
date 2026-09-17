const express = require('express'); //Importa o Express
const app = express(); //Cria o servidor do portfólio

//Criando a rota principal API
app.get('/', (req, res) => {
    res.json({
        nome: "Fagner",
        perfil: "Desenvolvedor",
        foco: "JavaScript, Node.js e React",
        mensagem: "Bem-vindo à API do meu portfólio!"
    });
});

app.get('/projetos', (req, res) => {
    res.json([
        {nome:"Balsamo Agenda",
        descricao:"Sistema de Agendamento massagem",
        status:"Concluido"},

        {nome:"Barbearia",
        descricao:"Sistema de Agendamento barbearia",
        status:"Em andamento"}
    ]);
});

app.get('/saudacao/:nome', (req, res) =>{

    const nomeDoRecrutador = req.params.nome;
    res.json({
        "mensagem": `Olá, + ${nomeDoRecrutador} + ! Obrigado por visitar o portfólio do Fagner.`
    });
});

// 4. Ligando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor do portfólio rodando na porta 3000! 🚀");
});