const express = require('express'); //Importa o Express
const app = express(); //Cria o servidor do portfólio
//ensina o express a ler JSON no corpo da requisição
app.use(express.json());

//Criando a rota principal API
app.get('/', (req, res) => {
    res.json({
        nome: "Fagner",
        perfil: "Desenvolvedor",
        foco: "JavaScript, Node.js e React",
        mensagem: "Bem-vindo à API do meu portfólio!"
    });
});

//rota para listar todos os projetos
app.get('/projetos', (req, res) => {
    res.json(meusProjetos);
});


app.get('/saudacao/:nome', (req, res) =>{

    const nomeDoRecrutador = req.params.nome;
    res.json({
        "mensagem": `Olá, ${nomeDoRecrutador}! Obrigado por visitar o portfólio do Fagner.`
    });
});

//Banco de dados falso para exemplo
const meusProjetos = [
    {id: 1, nome: "Balsamo Agenda", tecnologia: "NodeJS", status: "Concluido"},
    {id: 2, nome: "Barbearia", tecnologia: "ReactJS", status: "Em andamento"}
];

//rota para buscar um projeto específico pelo ID
app.get('/projetos/:id', (req, res) =>{
    // 1. Captura e converte o ID da URL
    const idBuscado = Number(req.params.id);
    
    // 2. Busca no array o projeto que tem o id igual ao idBuscado
    const projetoEncontrado = meusProjetos.find(projeto => projeto.id === idBuscado);
    
    // Lemos assim: "Se o projetoEncontrado existir (tiver conteúdo)..."
    if (projetoEncontrado) {
        res.json(projetoEncontrado);
    } else {
        // Se não existir (for undefined), cai aqui e devolve o erro 404
        res.status(404).json({ erro: "Projeto não encontrado" });
    }
    
});

//rota para criar um novo projeto
app.post('/projetos', (req, res) => {
    // 1. Captura exatamente o JSON que veio do Thunder Client
    const novoProjeto = req.body;

    // 2. Cria um ID para ele (simplesmente o tamanho do array + 1)
    novoProjeto.id = meusProjetos.length + 1;

    // 3. Adiciona no final do seu array
    meusProjetos.push(novoProjeto);

    // 4. Responde com Status 201 (Criado) e mostra o projeto salvo
    res.status(201).json(novoProjeto);
});


// 4. Ligando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor do portfólio rodando na porta 3000! 🚀");
});