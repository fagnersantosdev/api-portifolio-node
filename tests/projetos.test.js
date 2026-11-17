
const request = require('supertest');
const app = require('../app');

describe('Testes da API de Projetos', () => {

    test('Deve retornar a lista de projetos', async () => {
        const resposta = await request(app)
            .get('/projetos');

        expect(resposta.status).toBe(200);

        expect(Array.isArray(resposta.body)).toBe(true);
    });

    test('Deve rejeitar um ID inválido', async () => {
    const resposta = await request(app)
        .get('/projetos/abc');

    expect(resposta.status).toBe(400);

    expect(resposta.body).toHaveProperty('erro');
    });


    test('Deve cadastrar um projeto válido', async () => {
        const novoProjeto = {
            nome: "API de Testes",
            tecnologia: "Node.js",
            status: "Em desenvolvimento"
        };

        const resposta = await request(app)
            .post('/projetos')
            .send(novoProjeto);

        
        expect(resposta.status).toBe(201);

        expect(resposta.body).toMatchObject(novoProjeto);

        expect(resposta.body).toHaveProperty('id');
    });

    
    
    test('Deve rejeitar projeto com nome vazio', async () => {
        const projetoInvalido = {
            nome: "",
            tecnologia: "Node.js",
            status: "Concluído"
        };

        const resposta = await request(app)
            .post('/projetos')
            .send(projetoInvalido);

        expect(resposta.status).toBe(400);

        expect(resposta.body).toEqual({
            erro: "Os campos devem conter textos não vazios"
        });
    });



});
