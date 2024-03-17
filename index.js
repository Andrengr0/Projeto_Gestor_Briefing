// Importação de módulos e configuração inicial
const express = require('express'); // Importa o framework Express
const bodyParser = require('body-parser'); // Middleware para parsear corpos de requisições HTTP
const path = require('path'); // Utilitário para trabalhar com caminhos de arquivos e diretórios

const app = express(); // Inicializa a aplicação Express

// Importando módulo de rotas
const routes = require('./routes');

// Configurações da sessão do Express
var session = require('express-session');
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { maxAge: 720000 },
    resave: false, 
    saveUninitialized: true  
}));

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://andrenegreirosmoreira:Os4uaJLF5xPVHi7L@cluster0.g7np4mf.mongodb.net/Gestor_Briefings?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(function(){
        // console.log('Conectado com sucesso!');  // comentar essa linha para rodar nos testes
    }).catch(function(err){
        console.log(err.message);
    });


// Configuração do body-parser para parsear payloads JSON e codificados em URL com limite aumentado
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Configuração do EJS como o mecanismo de renderização de HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Define o diretório de recursos estáticos e de visualizações
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


// Usando os módulos importados
app.use('/', routes);


// Inicia o servidor na porta 3000
const port = 3000;
if (require.main === module) { // Verifica se o módulo está sendo executado diretamente
    app.listen(port, () => {
        console.log('Servidor rodando na porta: ' + port);
    });
}

module.exports = app;