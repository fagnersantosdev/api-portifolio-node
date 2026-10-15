const express = require('express');
const router = express.Router();
const meusProjetos = require('../data/projetos');

let proximoId = Math.max(
    ...meusProjetos.map(projeto => projeto.id),
    0
) + 1;

router.get('/', (req, res) => {
    res.json(meusProjetos);
});


//rota para buscar um projeto específico pelo ID
router.get('/:id', (req, res) =>{
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
router.post('/', (req, res) => {
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
        id: proximoId,
        nome,
        tecnologia,
        status
    };

    // 4. Adiciona o novo projeto ao array
    meusProjetos.push(novoProjeto);
    proximoId++;

    // 5. Retorna o novo projeto criado com status 201 (Created)
    res.status(201).json(novoProjeto);
});


router.put('/:id', (req, res) => {
    const idBuscado = Number(req.params.id);
    const projetoAtualizado = req.body;

    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado
    );

    if (indiceEncontrado === -1) {
        return res.status(404).json({
            erro: "Projeto não encontrado"
        });
    }

    if (
        !projetoAtualizado.nome ||
        !projetoAtualizado.tecnologia ||
        !projetoAtualizado.status
    ) {
        return res.status(400).json({
            erro: "Para atualizar o projeto, informe nome, tecnologia e status"
        });
    }

    meusProjetos[indiceEncontrado] = {
        id: idBuscado,
        nome: projetoAtualizado.nome,
        tecnologia: projetoAtualizado.tecnologia,
        status: projetoAtualizado.status
    };

    res.status(200).json(meusProjetos[indiceEncontrado]);
});

//rota para atualizar parcialmente um projeto pelo ID
router.patch('/:id', (req, res) => {
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
    meusProjetos[indiceEncontrado] = {
    ...meusProjetos[indiceEncontrado],
    ...atualizacao,
    id: idBuscado
        };
    }

    res.status(200).json(meusProjetos[indiceEncontrado]);
});

//rota para deletar um projeto pelo ID
router.delete('/:id',(req, res) =>{
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

// Exportando o router para ser usado no server.js
module.exports = router;