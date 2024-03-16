

let btn = $('#verSenha');
let btnConfirm = $('#verConfirmSenha');
let btnRedirectLogin = $('#btnRedirectLogin');
let btnCadastrar = $('#btn_cadastrar');

let nome = $('#nome');
let labelNome = $('#labelNome');
let validNome = false;

let email = $('#email');
let labelEmail = $('#labelEmail');
let validEmail = false;

let senha = $('#senha');
let labelSenha = $('#labelSenha');
let validSenha = false;

let confirmSenha = $('#confirmSenha');
let labelConfirmSenha = $('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = $('#msgError');
let msgSuccess = $('#msgSuccess');

nome.keyup(function() {
    if (nome.val().length <= 2) {
        labelNome.css('color', 'red');
        labelNome.html('Nome *Insira no mínimo 3 caracteres');
        nome.css('border-color', 'red');
        validNome = false;
    } else {
        labelNome.css('color', 'green');
        labelNome.html('Nome');
        nome.css('border-color', 'green');
        validNome = true;
    }
});

email.keyup(function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.val())) {
        labelEmail.css('color', 'red');
        labelEmail.html('E-mail *Insira um e-mail válido');
        email.css('border-color', 'red');
        validEmail = false;
    } else {
        labelEmail.css('color', 'green');
        labelEmail.html('E-mail');
        email.css('border-color', 'green');
        validEmail = true;
    }
});

senha.keyup(function() {
    if (senha.val().length <= 5) {
        labelSenha.css('color', 'red');
        labelSenha.html('Senha *Insira no mínimo 6 caracteres');
        senha.css('border-color', 'red');
        validSenha = false;
    } else {
        labelSenha.css('color', 'green');
        labelSenha.html('Senha');
        senha.css('border-color', 'green');
        validSenha = true;
    }
});

confirmSenha.keyup(function() {
    if (senha.val() != confirmSenha.val()) {
        labelConfirmSenha.css('color', 'red');
        labelConfirmSenha.html('Confirmar Senha *As senhas não conferem');
        confirmSenha.css('border-color', 'red');
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.css('color', 'green');
        labelConfirmSenha.html('Confirmar Senha');
        confirmSenha.css('border-color', 'green');
        validConfirmSenha = true;
    }
});

function cadastrar() {
    if (validNome && validEmail && validSenha && validConfirmSenha) {
        const usuarioData = {
            nome: nome.val(),
            email: email.val(),
            senha: senha.val()
        };

        $.ajax({
            url: '/admin/cadastrar/usuario',
            method: 'POST',
            data: usuarioData,
            success: function(response) {
                btnCadastrar.css('display', 'none');
                btnRedirectLogin.css('display', 'block');
                msgSuccess.css('display', 'block');
                msgSuccess.html('<strong>Cadastrado com sucesso...</strong>');
                msgError.css('display', 'none');
                msgError.html('');
            },
            error: function(err) {
                console.error('Erro ao cadastrar usuário:', err);
                msgError.css('display', 'block');
                if (err.responseJSON && err.responseJSON.message) {
                    msgError.html('<strong>' + err.responseJSON.message + '</strong>');
                } else {
                    msgError.html('<strong>Erro ao cadastrar usuário. Tente novamente.</strong>');
                }
                msgSuccess.html('');
                msgSuccess.css('display', 'none');
            }
        });
    } else {
        msgError.css('display', 'block');
        msgError.html('<strong>Preencha todos os campos corretamente antes de cadastrar</strong>');
        msgSuccess.html('');
        msgSuccess.css('display', 'none');
    }
}

btn.on('click', function() {
    let inputSenha = $('#senha');

    if (inputSenha.attr('type') == 'password') {
        inputSenha.attr('type', 'text');
    } else {
        inputSenha.attr('type', 'password');
    }
});

btnRedirectLogin.on('click', function() {
    $('#modal_cadastro').modal('hide');
});

btnConfirm.on('click', function() {
    let inputConfirmSenha = $('#confirmSenha');

    if (inputConfirmSenha.attr('type') == 'password') {
        inputConfirmSenha.attr('type', 'text');
    } else {
        inputConfirmSenha.attr('type', 'password');
    }
});
