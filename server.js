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
    // 1. Captura os dados do corpo da requisição
    const { nome, tecnologia, status } = req.body;

    // 2. Valida se todos os campos foram informados
    if (!nome || !tecnologia || !status) {
        return res.status(400).json({
            erro: "Informe nome, tecnologia e status do projeto"
        });
    }

    // 3. Cria um novo projeto com ID incremental
    const novoProjeto = {
        id: meusProjetos.length + 1,
        nome,
        tecnologia,
        status
    };

    // 4. Adiciona o novo projeto ao array
    meusProjetos.push(novoProjeto);

    // 5. Retorna o novo projeto criado com status 201 (Created)
    res.status(201).json(novoProjeto);
});

//rota para deletar um projeto pelo ID
app.delete('/projetos/:id',(req, res) =>{
    // 1. Captura e converte o ID da URL
    const idBuscado = Number(req.params.id);

    // 2. Busca o índice do projeto no array
    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado);
    
    // 3. Se o índice for -1, significa que o projeto não foi encontrado
    if (indiceEncontrado === -1) {
        return res.status(404).json({ 
            erro: "Projeto não encontrado" });
    } else {
    // 4. Remove o projeto do array usando splice
        meusProjetos.splice(indiceEncontrado, 1);

    // 5. Retorna uma mensagem de sucesso
        res.status(200).json({ mensagem: "Projeto excluído com sucesso!" });
    }
});

//rota para atualizar um projeto pelo ID
app.put('/projetos/:id', (req, res) => {
    // 1. Captura e converte o ID da URL
    const idBuscado = Number(req.params.id);
    // 2. Captura os dados do corpo da requisição
    const projetoAtualizado = req.body;
    // 3. Busca o índice do projeto no array
    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado);
    
    // 4. Se o índice for -1, significa que o projeto não foi encontrado
    if (indiceEncontrado === -1) {
        return res.status(404).json({ 
            erro: "Projeto não encontrado" });
    } else if (!projetoAtualizado.nome || !projetoAtualizado.tecnologia || !projetoAtualizado.status) {
        return res.status(400).json({
            erro: "Para atualizar o projeto, informe nome, tecnologia e status"
        });
    } else {
    // 5. Atualiza o projeto no array usando spread operator
        meusProjetos[indiceEncontrado] = { ...meusProjetos[indiceEncontrado], ...projetoAtualizado };
        res.status(200).json(meusProjetos[indiceEncontrado]);
    }
});

//rota para atualizar parcialmente um projeto pelo ID
app.patch('/projetos/:id', (req, res) => {
    // 1. Captura e converte o ID da URL
    const idBuscado = Number(req.params.id);
    // 2. Captura os dados do corpo da requisição
    const atualizacao = req.body;
    // 3. Busca o índice do projeto no array
    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado);
    
    // 4. Se o índice for -1, significa que o projeto não foi encontrado
    if (indiceEncontrado === -1) {
        return res.status(404).json({ 
            erro: "Projeto não encontrado" });
    } else {
    // 5. Atualiza o projeto no array usando spread operator (em outras palavras está dizendo: "pegue o projeto que já existe e atualize com os novos dados")
        meusProjetos[indiceEncontrado] = { ...meusProjetos[indiceEncontrado], ...atualizacao };
        res.status(200).json(meusProjetos[indiceEncontrado]);
    }
});


// 4. Ligando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor do portfólio rodando na porta 3000! 🚀");
});