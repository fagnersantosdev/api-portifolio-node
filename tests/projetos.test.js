
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

});
