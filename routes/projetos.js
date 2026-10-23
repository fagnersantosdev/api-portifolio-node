const express = require('express');
const router = express.Router();
const meusProjetos = require('../data/projetos');

const statusPermitidos = [
    "Em desenvolvimento",
    "Concluído",
    "Em planejamento"
];

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
    const atualizacao = req.body;

    const indiceEncontrado = meusProjetos.findIndex(
        projeto => projeto.id === idBuscado
    );

    const camposRecebidos = Object.keys(atualizacao);
    const valoresInvalidos = camposRecebidos.some(campo => {
        return typeof atualizacao[campo] !== 'string' ||
            atualizacao[campo].trim() === '';
    });

    if (indiceEncontrado === -1) {
        return res.status(404).json({
            erro: "Projeto não encontrado"
        });
    }

    if (valoresInvalidos) {
        return res.status(400).json({
            erro: "Os campos devem conter textos não vazios"
        });
    }


    if (
        !atualizacao.nome ||
        !atualizacao.tecnologia ||
        !atualizacao.status
    ) {
        return res.status(400).json({
            erro: "Para atualizar o projeto, informe nome, tecnologia e status"
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

    res.status(200).json(meusProjetos[indiceEncontrado]);
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
    } else {
        // 5. Define os campos que podem ser atualizados
        const camposPermitidos = [
            'nome',
            'tecnologia',
            'status'
        ];

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
    }
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