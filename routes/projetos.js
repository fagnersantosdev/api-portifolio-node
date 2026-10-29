
const express = require('express');
const router = express.Router();
const meusProjetos = require('../data/projetos');

const statusPermitidos = [
    "Em desenvolvimento",
    "Concluído",
    "Em planejamento"
];

const camposPermitidos = [
    "nome",
    "tecnologia",
    "status"
];


function validarValores(dados) {
    const camposRecebidos = Object.keys(dados);

    const valoresInvalidos = camposRecebidos.some(campo => {
        return typeof dados[campo] !== 'string' ||
               dados[campo].trim() === '';
    });

    return valoresInvalidos;
}


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

    // 1. Verifica se o corpo é um objeto válido
    if (
        !req.body ||
        typeof req.body !== 'object' ||
        Array.isArray(req.body)
    ) {
        return res.status(400).json({
            erro: "Envie um objeto JSON válido"
        });
    }

    // 2. Captura os dados recebidos
    const { nome, tecnologia, status } = req.body;

    // 3. Verifica os campos obrigatórios
    if (
        nome === undefined ||
        tecnologia === undefined ||
        status === undefined
    ) {
        return res.status(400).json({
            erro: "Informe nome, tecnologia e status"
        });
    }

    const valoresInvalidos = validarValores(req.body);

    if (valoresInvalidos) {
        return res.status(400).json({
            erro: "Os campos devem conter textos não vazios"
        });
    }

    if (valoresInvalidos) {
        return res.status(400).json({
            erro: "Os campos devem conter textos não vazios"
        });
    }

    // 5. Valida o status
if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            erro: "Status inválido",
            statusPermitidos
        });
    }

    // 6. Cria o projeto
    const novoProjeto = {
        id: proximoId,
        nome,
        tecnologia,
        status
    };

    // 7. Adiciona ao array
    meusProjetos.push(novoProjeto);

    // 8. Incrementa o próximo ID
    proximoId++;

    // 9. Retorna o projeto criado
    return res.status(201).json(novoProjeto);
});



router.put('/:id', (req, res) => {
    const idBuscado = Number(req.params.id);
    const atualizacao = req.body;

    // 1. Verifica se o corpo é um objeto válido
    if (
        !atualizacao ||
        typeof atualizacao !== 'object' ||
        Array.isArray(atualizacao)
    ) {
        return res.status(400).json({
            erro: "Envie um objeto JSON válido"
        });
    }

    // 2. Procura o projeto
    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado
    );

    if (indiceEncontrado === -1) {
        return res.status(404).json({
            erro: "Projeto não encontrado"
        });
    }

    // 3. Verifica se todos os campos foram enviados
    if (
        !Object.hasOwn(atualizacao, 'nome') ||
        !Object.hasOwn(atualizacao, 'tecnologia') ||
        !Object.hasOwn(atualizacao, 'status')
    ) {
        return res.status(400).json({
            erro: "Informe nome, tecnologia e status"
        });
    }

    // 4. Identifica os campos recebidos
    const camposRecebidos = Object.keys(atualizacao);

    // 5. Identifica campos não permitidos
    const camposInvalidos = camposRecebidos.filter(
        campo => !camposPermitidos.includes(campo)
    );

    if (camposInvalidos.length > 0) {
        return res.status(400).json({
            erro: "Existem campos não permitidos",
            campos: camposInvalidos
        });
    }

    // 6. Valida os valores
    const valoresInvalidos = camposRecebidos.some(campo => {
        return typeof atualizacao[campo] !== 'string' ||
               atualizacao[campo].trim() === '';
    });

    if (valoresInvalidos) {
        return res.status(400).json({
            erro: "Os campos devem conter textos não vazios"
        });
    }

    // 7. Valida o status
    if (!statusPermitidos.includes(atualizacao.status)) {
        return res.status(400).json({
            erro: "Status inválido",
            statusPermitidos
        });
    }

    // 8. Substitui os dados editáveis do projeto
    meusProjetos[indiceEncontrado] = {
        id: idBuscado,
        nome: atualizacao.nome,
        tecnologia: atualizacao.tecnologia,
        status: atualizacao.status
    };

    return res.status(200).json(
        meusProjetos[indiceEncontrado]
    );
});



router.patch('/:id', (req, res) => {
    // 1. Captura e converte o ID da URL
    const idBuscado = Number(req.params.id);

    // 2. Captura os dados enviados
    const atualizacao = req.body;

    // 3. Busca o índice do projeto
    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado
    );

    // 4. Verifica se o projeto existe
    if (indiceEncontrado === -1) {
        return res.status(404).json({
            erro: "Projeto não encontrado"
        });
    } 

    if (
        !atualizacao ||
        typeof atualizacao !== 'object' ||
        Array.isArray(atualizacao)
    ) {
        return res.status(400).json({
            erro: "Envie um objeto JSON válido"
        });
    }

    // 6. Verifica se existem campos não permitidos
    const camposRecebidos = Object.keys(atualizacao);

    const camposInvalidos = camposRecebidos.filter(
            campo => !camposPermitidos.includes(campo)
    );

    if (camposInvalidos.length > 0) {
        return res.status(400).json({
            erro: "Existem campos não permitidos",
            campos: camposInvalidos
        });
    }

    // 7. Verifica se foi enviado pelo menos um campo
    if (camposRecebidos.length === 0) {
        return res.status(400).json({
            erro: "Informe ao menos um campo para atualizar"
        });
    }

    // 8. Valida os valores recebidos
    const valoresInvalidos = camposRecebidos.some(campo => {
        return typeof atualizacao[campo] !== 'string' ||
            atualizacao[campo].trim() === '';
    });

    if (valoresInvalidos) {
        return res.status(400).json({
            erro: "Os campos devem conter textos não vazios"
        });
    }

    if (
        atualizacao.status !== undefined &&
        !statusPermitidos.includes(atualizacao.status)
    ) {
        return res.status(400).json({
            erro: "Status inválido",
            statusPermitidos
            });
    }

    // 9. Atualiza o projeto
    meusProjetos[indiceEncontrado] = {
    ...meusProjetos[indiceEncontrado],
    ...atualizacao,
    id: idBuscado
    };

    // 10. Retorna o projeto atualizado
        return res.status(200).json(
            meusProjetos[indiceEncontrado]
    );
    
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