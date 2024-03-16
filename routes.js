// Importação de módulos e configuração inicial
const express = require('express'); // Importa o framework Express
const router = express.Router();
const bcrypt = require('bcrypt'); // Módulo para criptografar senhas
const Usuarios = require('./models/Usuarios');
const Briefings = require('./models/Briefings');


// Rota principal para exibir pagina Home
router.get('/', async (req, res) => {
    try {
        res.render('home', {err:null});
    } catch (err) {
        console.error("Ocorreu um erro:", err);
        res.status(500).send("Erro ao renderizar página.");
    }
});


// Rota para verificar a tentativa de login
router.post("/admin/login", async (req, res) => {
    try {
        // Extrai email e senha da requisição
        const { email_login, senha_login } = req.body;
        const email = email_login;
        const senha = senha_login;

        // Procura o usuário com o email fornecido no banco de dados
        const usuario = await Usuarios.findOne({ email });
        // Verifica se o usuário existe e se a senha está correta
        if (usuario) {
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        
            if (senhaCorreta) {
                // Autenticação bem-sucedida, armazena o email do usuário na sessão
                req.session.email = usuario.email;
                res.redirect('/painel/projetos');
            } else {
                // Credenciais inválidas, renderiza a página de login com erro
                return res.render('home', { err: 'Credenciais inválidas.' });
            }
        } else {
            // Credenciais inválidas, renderiza a página de login com erro
            return res.render('home', { err: 'Usuario não encontrado.' });
        }        
    } catch (err) {
        console.error("Ocorreu um erro:", err);
        res.status(500).send("Erro ao autenticar o usuário.");
    }

});



// Rota para renderizar a página do painel de gestão
router.get('/painel/projetos', async (req,res)=>{
    // Verifica se o usuário está autenticado
    if (req.session.email == null) {
        // Redireciona para a página inicial com o parâmetro de sessão expirada
        res.redirect('/?expired=true');
    } else {
        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado e se possui a propriedade nome
        let nomeUsuario = '';
        if (usuario && usuario.nome) {
            nomeUsuario = usuario.nome.split(" ")[0];
        }

        Briefings.find().sort({'_id': -1}).then(function(briefings){
            // Formata os dados dos briefings para renderização do painel de gestão
            briefings = briefings.map(function(val){
                return {
                    nomeCliente: val.nomeCliente,
                    titulo: val.titulo,
                    descricao: val.descricao,
                    estado: val.estado,
                    data: val.data,
                    idBriefing: val.idBriefing
                }
            })
            res.render('painel', {briefings: briefings, nomeUsuario, err: null});
        })
    }
})



// Rota para cadastrar um novo briefing
router.post('/admin/cadastro/briefing', async (req, res) => {
    try {
        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });
        
        // Cria um novo briefing no banco de dados com base nos dados recebidos do formulário
        const briefing = await Briefings.create({
            nomeCliente: req.body.nome_cliente,
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            estado: req.body.estado_briefing,
            data: new Date().toLocaleString('pt-br').substr(0, 10),
            idBriefing: new Date().getTime(),
            idUsuario: usuario.idUsuario
        });

        // Redireciona para a página de painel de gestão
        res.redirect('/painel/projetos');
    } catch (err) {
        // Em caso de erro, exibe uma mensagem de erro e status 500
        console.error('Erro ao cadastrar o briefing:', err);
        res.status(500).send('Erro ao cadastrar o briefing.');
    }
});



// Rota para obter todos os briefings do usuário atual
router.get('/obter/briefings', async (req, res) => {
    try {
        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Extrai o ID do usuário da sessão
        const idUsuario = usuario.idUsuario;

        // Extrai os parâmetros de filtro da requisição
        const filtroStatus = req.query.status;
        const filtroBusca = req.query.busca;

        // Crie um objeto de filtro com base no ID do usuário
        let filtro = { idUsuario };

        // Verifica se o filtro de status está definido e diferente de "Todos"
        if (filtroStatus && filtroStatus !== "") {
            filtro.estado = filtroStatus;
        }

        // Verifica se o filtro de busca está definido
        if (filtroBusca) {
            // Crie uma expressão regular para buscar a combinação de letras em qualquer lugar do título
            const regexBusca = new RegExp(filtroBusca, 'i');
            filtro.titulo = { $regex: regexBusca };
        }

        // Busca os briefings no banco de dados com base nos filtros
        const briefings = await Briefings.find(filtro).sort({ '_id': -1 });

        // Retorna os briefings como JSON
        res.json(briefings);
    } catch (err) {
        // Em caso de erro, envia uma mensagem de erro
        console.error('Erro ao obter os briefings:', err);
        res.status(500).json({ error: 'Erro ao obter os briefings.' });
    }
});




// Rota para alterar um briefing
router.post('/admin/alterar/briefing/:idBriefing', async (req, res) => {
    try {
        // Extrai o idBriefing da URL
        const idBriefing = req.params.idBriefing;

        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Extrai o ID do usuário da sessão
        const idUsuario = usuario.idUsuario;

        // Verifica se o briefing pertence ao usuário da sessão
        let briefing = await Briefings.findOne({ idBriefing, idUsuario });

        // Verificar se o briefing foi encontrado e se pertence ao usuário
        if (!briefing) {
            return res.status(404).json({ error: 'Briefing não encontrado ou não pertence ao usuário.' });
        }

        // Atualiza o briefing no banco de dados com base no idBriefing fornecido
        await Briefings.findOneAndUpdate(
            { idBriefing: idBriefing }, // Procura pelo briefing com o idBriefing especificado
            {
                nomeCliente: req.body.nome_cliente,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                estado: req.body.estado_briefing
            },
            { new: true } // Retorna o documento atualizado
        );

        // Retorna os dados atualizados do briefing como JSON
        res.json(briefing);
    } catch (err) {
        // Em caso de erro, envia uma mensagem de erro
        console.log('Erro ao alterar o Briefing', err)
        res.status(500).json({ error: 'Erro ao alterar o briefing.' });
    }
});



// Rota para obter um briefing específico pelo ID, associado ao usuário da sessão
router.get('/obter/briefing/:idBriefing', async (req, res) => {
    try {
        // Extrair o idBriefing da URL
        const idBriefing = req.params.idBriefing;

        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Extrai o ID do usuário da sessão
        const idUsuario = usuario.idUsuario;

        // Buscar o briefing no banco de dados pelo ID e pelo ID do usuário da sessão
        const briefing = await Briefings.findOne({ idBriefing, idUsuario });

        // Verificar se o briefing foi encontrado
        if (!briefing) {
            return res.status(404).json({ error: 'Briefing não encontrado.' });
        }

        // Retorna o briefing encontrado como JSON
        res.json(briefing);
    } catch (err) {
        // Em caso de erro, envia uma mensagem de erro
        console.error('Erro ao obter o briefing:', err);
        res.status(500).json({ error: 'Erro ao obter o briefing.' });
    }
});




// Rota para deletar um briefing
router.get('/deletar/briefing/:idBriefing', async (req, res) => {
    try {
        // Extrai o idBriefing da URL
        const idBriefing = req.params.idBriefing;

        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Extrai o ID do usuário da sessão
        const idUsuario = usuario.idUsuario;

        // Verifica se o briefing pertence ao usuário da sessão
        const briefing = await Briefings.findOne({ idBriefing, idUsuario });

        // Verificar se o briefing foi encontrado e se pertence ao usuário
        if (!briefing) {
            return res.status(404).json({ error: 'Briefing não encontrado ou não pertence ao usuário.' });
        }

        // Deleta o briefing do banco de dados com base no idBriefing e idUsuario fornecidos
        await Briefings.deleteOne({ idBriefing, idUsuario });

        // Redireciona para a página de usuários após a exclusão
        res.redirect('/painel/projetos');
    } catch (err) {
        // Em caso de erro, envia uma mensagem de erro
        console.error('Erro ao deletar o briefing:', err);
        res.status(500).json({ error: 'Erro ao deletar o briefing.' });
    }
});


router.get('/painel/dados-pessoais', async (req, res) => {
    // Verifica se o usuário está autenticado
    if (req.session.email == null) {
        // Redireciona para a página inicial com o parâmetro de sessão expirada
        res.redirect('/?expired=true');
    } else {
        // Recupera o email do usuário da sessão
        const emailUsuario = req.session.email;

        // Realiza uma consulta ao banco de dados para obter o usuário com base no email
        const usuario = await Usuarios.findOne({ email: emailUsuario });

        // Verifica se o usuário foi encontrado e se possui a propriedade nome
        let nomeUsuario = '';
        if (usuario && usuario.nome) {
            nomeUsuario = usuario.nome.split(" ")[0];
        }

        dadosUsuario = {
            nome: usuario.nome,
            email: usuario.email
        }
        res.render('dados-pessoais', {dadosUsuario, nomeUsuario, err: null});
    }
})




function generateUserId() {
    // Obtém o timestamp atual
    const timestamp = new Date().getTime();
    // Gera três dígitos aleatórios entre 100 e 999
    const randomDigits = Math.floor(Math.random() * 900) + 100;
    // Combina o timestamp com os dígitos aleatórios para formar o ID
    const userId = timestamp.toString() + randomDigits.toString();
    return userId;
}


// Rota para cadastrar um novo usuário a partir de um formulário
router.post('/admin/cadastrar/usuario', async (req, res) => {
    try {
        // Verifica se o email já está cadastrado no banco de dados
        const usuarioExistente = await Usuarios.findOne({ email: req.body.email });
        if (usuarioExistente) {
            // Se o email já estiver cadastrado, retorna um status 400 e uma mensagem de erro
            return res.status(400).send({ success: false, message: 'Email já está em uso.' });
        }

        // Hash da senha do usuário antes de armazená-la no banco de dados
        const hashedPassword = await bcrypt.hash(req.body.senha, 10);

        // Cria um novo usuário no banco de dados com os dados fornecidos no formulário
        const usuario = await Usuarios.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedPassword,
            idUsuario: generateUserId()
        });

        // Responde com um JSON indicando sucesso e uma mensagem
        res.send({ success: true, message: 'Usuário cadastrado com sucesso.' });
    } catch (err) {
        // Em caso de erro, exibe uma mensagem de erro e status 500
        console.error('Erro ao cadastrar o usuário:', err);
        res.status(500).send('Erro ao cadastrar o usuário.');
    }
});


// Rota para sair do painel do usuário e encerrar a sessão
router.get('/painel/admin/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
            res.status(500).send('Erro ao encerrar a sessão.');
        } else {
            res.redirect('/'); // Redirecione para a página inicial ou qualquer outra página desejada
        }
    });
});


module.exports = router;