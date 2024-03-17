# Gestor de Briefings

#### Etapas alcançadas para a seleção do projeto VivaMoveis: 01, 02, 03

#### Neste projeto foram utilizadas Inteligências Artificiais para impulsionar a produtividade, gerando scripts úteis implementação e aprendizado, proporcionando uma série de funcionalidades e aprimoramento fundamentais para a resolução do problema, contribuindo para eficiência máxima de tempo. Esta também foi utilizada para geração de frase na apresentação do webapp e auxílio na construção desta própria documentação.

## Visão Geral

O projeto "Gestor de Briefings" é uma aplicação web desenvolvida para auxiliar na gestão e organização de briefings de projetos. Com esta aplicação, os usuários podem criar, visualizar, editar e excluir briefings de forma eficiente.


## Tecnologias Utilizadas no Back-end

- **Node.js:** Plataforma de desenvolvimento JavaScript assíncrona orientada a eventos, utilizada no lado do servidor.
- **Express.js:** Framework web para Node.js que fornece um conjunto robusto de recursos para desenvolver aplicativos web e APIs.
- **MongoDB:** Banco de dados NoSQL utilizado para armazenar os dados dos briefings e dos usuários.
- **Mongoose:** ODM (Object Data Modeling) para MongoDB, utilizado para modelar os dados da aplicação e fornecer uma interface mais simples e baseada em esquemas para interagir com o MongoDB.
- **bcrypt:** Biblioteca para hash de senhas, utilizada para armazenar senhas de forma segura no banco de dados.
- **EJS (Embedded JavaScript):** Mecanismo de renderização de HTML utilizado para renderizar as visualizações dinâmicas da aplicação.


## Tecnologias Utilizadas no Front-end

- **HTML 5:** Linguagem de marcação utilizada para estruturar e apresentar conteúdo na web.
- **CSS 3:** Linguagem de estilo utilizada para estilizar elementos HTML e criar layouts visualmente atraentes.
- **Bootstrap 4.1.0:** Framework front-end que facilita o desenvolvimento de interfaces web responsivas e com um design consistente.
- **JQuery 3.7.1:** Biblioteca de JavaScript que simplifica a manipulação do DOM e fornece uma variedade de recursos para interatividade e animação em páginas web.
- **Font Awesome 4.0:** Conjunto de ícones vetoriais e ferramentas para adicionar ícones e glifos visualmente atraentes na aplicação.


## Estrutura do Projeto
- **`Node.js`:** v18.16.0
- **`index.js`:** Arquivo principal que contém a configuração do servidor Express e define as rotas da aplicação.
- **`routes.js`:** Arquivo que define as rotas da aplicação.
- **`models/Usuarios.js` e `models/Briefings.js`:** Modelos de dados que definem a estrutura dos documentos armazenados no banco de dados MongoDB.
- **`pages/`:** Diretório contendo as páginas HTML da aplicação.
- **`public/`:** Diretório contendo arquivos estáticos, como imagens, folhas de estilo e scripts JavaScript.
- **`__tests__/`:** Diretório contendo alguns testes automatizados para garantir a qualidade do código.

## Instalação e Execução

Para executar o projeto localmente, siga estas etapas:

1. **Clonar o Repositório:**
    Faça um clone do projeto na sua máquina
   ```
   git clone https://github.com/Andrengr0/Projeto_Gestor_Briefing.git
   ```

2. **Instalar Dependências:**
    Certifique-se de ter pelo menos o Node.js versão 18.x. Com o repositório clonado e o projeto já aberto no seu editor de código, no terminal execute o comando a seguir...
   ```
   npm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias, como as credenciais do banco de dados MongoDB.

4. **Executar o Servidor:**
   ```
   npm start
   ```

5. **Acessar a Aplicação:**
   Abra um navegador da web e acesse `http://localhost:3000` para usar a aplicação.

## Funcionalidades Principais

- **Autenticação de Usuários:** Os usuários podem se autenticar utilizando um email e senha cadastrados previamente.
- **Gerenciamento de Briefings:** Os usuários autenticados podem criar, visualizar, editar e excluir briefings.
- **Filtragem de Briefings:** Os briefings podem ser filtrados por status e por termos de busca.
- **Visualização de Dados Pessoais:** Os usuários podem visualizar e editar seus dados pessoais, como nome e email.
- **Encerramento de Sessão:** Os usuários podem encerrar sua sessão a qualquer momento.

## Contribuição e Suporte

Se você deseja contribuir com o projeto ou reportar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request no repositório do projeto no GitHub: [seu-usuario/gestor-briefings](https://github.com/seu-usuario/gestor-briefings).

Para obter suporte ou tirar dúvidas sobre o projeto, entre em contato com a equipe de desenvolvimento por meio do email [email@exemplo.com](mailto:email@exemplo.com).

---

Esta documentação fornece uma visão geral do projeto "Gestor de Briefings", incluindo informações sobre tecnologias utilizadas, estrutura do projeto, instruções de instalação e execução, principais funcionalidades e canais de contribuição e suporte.

 
