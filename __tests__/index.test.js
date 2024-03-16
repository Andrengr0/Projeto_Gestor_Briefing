const request = require('supertest');
const app = require('../index.js'); // Importe seu aplicativo Express

// Teste para verificar se a rota principal está funcionando corretamente
test('Deve retornar status 200 na rota principal', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
});

// Teste para verificar se a rota de autenticação está funcionando corretamente
test('Deve autenticar o usuário corretamente', async () => {
  const response = await request(app)
    .post('/painel/admin')
    .send({ email: 'andrenegreirosmoreira@gmail.com', senha: '1234' });
  expect(response.statusCode).toBe(302); // Verifica se o redirecionamento ocorreu corretamente
});