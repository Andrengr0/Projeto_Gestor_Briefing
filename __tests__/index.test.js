const request = require('supertest');
const app = require('../index.js'); // Importe seu aplicativo Express

// Teste para verificar se a rota principal está funcionando corretamente
test('Deve retornar status 200 na rota principal', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
});

describe('POST /admin/cadastro/briefing', () => {

  test('Deve cadastrar um novo briefing quando todos os dados são válidos', async () => {
      const response = await request(app)
          .post('/admin/cadastro/briefing')
          .send({
              nome_cliente: 'Cliente Teste',
              titulo: 'Briefing de Teste',
              descricao: 'Descrição do Briefing de Teste',
              estado_briefing: 'Aprovado',
              orcamento: 1000,
              prazo_final: new Date().toISOString() // Define o prazo final como a data atual
          })
          .set('Cookie', ['email=andrenegreirosmcpe@gmail.com']); // Define o cookie de sessão com o email do usuário autenticado

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Briefing cadastrado com sucesso!');
  });

  test('Deve retornar um erro quando a data de prazo final é menor ou igual à data atual', async () => {
      const response = await request(app)
          .post('/admin/cadastro/briefing')
          .send({
              nome_cliente: 'Cliente Teste',
              titulo: 'Briefing de Teste',
              descricao: 'Descrição do Briefing de Teste',
              estado_briefing: 'Aprovado',
              orcamento: 1000,
              // Define o prazo final como uma data no passado
              prazo_final: new Date('2022-01-01').toISOString()
          })
          .set('Cookie', ['email=andrenegreirosmcpe@gmail.com']); // Define o cookie de sessão com o email do usuário autenticado

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'A data de prazo final deve ser maior que a data atual.');
  });

  test('Deve retornar um erro quando o orçamento é menor que zero', async () => {
      const response = await request(app)
          .post('/admin/cadastro/briefing')
          .send({
              nome_cliente: 'Cliente Teste',
              titulo: 'Briefing de Teste',
              descricao: 'Descrição do Briefing de Teste',
              estado_briefing: 'Aprovado',
              // Define um orçamento negativo
              orcamento: -100,
              prazo_final: new Date().toISOString() // Define o prazo final como a data atual
          })
          .set('Cookie', ['email=andrenegreirosmcpe@gmail.com']); // Define o cookie de sessão com o email do usuário autenticado

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('message', 'O orçamento não pode ser menor que zero.');
  });
});