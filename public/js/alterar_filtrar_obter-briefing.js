

// Adicione manipuladores de eventos para os filtros
$('#filtro_status').change(function() {
    atualizarBriefings();
});

$('#buscar-briefing').on('input', function() {
    atualizarBriefings();
});


// Assim que carrega a página, faz a chamada para listar os briefings
atualizarBriefings();

// Adicione um manipulador de eventos para os botões de alteração de briefing
function alterarBriefing(idBriefing) {
    // Obtém o valor do campo de data de prazo final
    let prazoFinal = $('#prazo_final_alt').val();
    // Obtém a data atual
    let dataAtual = new Date().toISOString().split('T')[0];

    valorOrcamento = $('#orcamento_alt').val();
    nomeCliente = $('#nome_cliente_alt').val();
    tituloProjeto = $('#titulo_alt').val();

    if(nomeCliente == ""){
        $('#nome_cliente_invalido_alt').fadeIn();
        return;
    }else if(tituloProjeto == ""){
        $('#titulo_invalido_alt').fadeIn();
        return;
    }else if(valorOrcamento < 0){
        $('#orcamento_invalido_alt').fadeIn();
        return;
    }else if(prazoFinal <= dataAtual) {
        $('#prazo_final_invalido_alt').fadeIn();
        return;
    }

    // fecha o modal após solicitar alteração do conteúdo
    $("#modal_alterar_briefing").modal('hide');

    // Encontra o formulário específico com base no idBriefing
    let formBriefing = $('#form-briefing-' + idBriefing);

    // Envia o idBriefing para a função enviarFormulario
    enviarFormulario(idBriefing, formBriefing);
};

function enviarFormulario(idBriefing, formBriefing) {
    $.ajax({
        type: "POST",
        url: "/admin/alterar/briefing/" + idBriefing,
        data: formBriefing.serialize(),
        success: function(response) {
            if(response.message != "Briefing alterado com sucesso!"){
                window.location.href = '/?expired=true';
            }
            // Após a alteração bem-sucedida, atualiza a lista de briefings
            atualizarBriefings();

            // Define o texto da mensagem
            $("#msg_modal").text(response.message);
            $(".msg-modal").fadeIn();
        },
        error: function(error) {
            console.error("Erro ao alterar o briefing:", error);
        }
    });
}

// Função para obter e atualizar a lista de briefings
function atualizarBriefings() {
    $.ajax({
        type: "GET", // Ou o método que você usa para obter os briefings
        url: "/obter/briefings", // A rota para obter os briefings atualizados
        data: {
            status: $('#filtro_status').val(), // Valor selecionado no filtro de status
            busca: $('#buscar-briefing').val() // Valor digitado no filtro de busca
        },
        success: function(briefings) {
            // Limpa a div #box-card-briefing
            $("#box-card-briefing").empty();

            if(briefings){
                // Reconstrói a lista de briefings com os dados atualizados
                for (let i = 0; i < briefings.length; i++) {

                    // Obtém a data inicial e a data final do briefing
                    const dataInicial = new Date(briefings[i].data);
                    let prazoFinal = new Date(briefings[i].prazoFinal);
                    prazoFinal = prazoFinal.setDate(prazoFinal.getDate() + 1);

                    // Calcula a diferença em milissegundos entre as datas
                    const diferencaMilissegundos = prazoFinal - dataInicial;

                    // Converte a diferença de milissegundos para dias
                    const diferencaDias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));

                    // Obtém a data atual
                    const hoje = new Date();

                    // Calcula a diferença em milissegundos entre a data atual e o prazo final
                    const diferencaMilissegundosAtual = hoje - dataInicial;

                    // Converte a diferença de milissegundos para dias
                    const diasCorridos = Math.ceil(diferencaMilissegundosAtual / (1000 * 60 * 60 * 24));

                    porcentagemPrazo = Math.round((diasCorridos / diferencaDias) * 100);

                    let corProgresso;
                    if(hoje.setHours(0, 0, 0, 0) < prazoFinal){
                        corProgresso = "#007BFF";
                    }else{
                        corProgresso = "#ff0000";
                    }

                    $("#box-card-briefing").append(`
                        <div class="card-briefing-single row mt-4 align-items-center">
                            <div class="col-nome col-lg-4" data-id="${briefings[i].idBriefing}">
                                <span class="nome-projeto">${briefings[i].titulo} <i class="fa fa-info-circle" aria-hidden="true"></i></span>
                            </div><!-- col-nome -->
                            <div class="col-status col-md-3">
                                <span class="span-cols" style="font-size: 14px; display: none;">Estado: </span>
                                <div class="status ${getStatusClass(briefings[i].estado)}">
                                    <span>${briefings[i].estado}</span>
                                </div><!-- status -->
                            </div><!-- col-status -->
                            <div class="col-alterar col-md-2">
                                <button class="btn-alterar-briefing" type="button" onclick='modalAlterarBriefing(${briefings[i].idBriefing})'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                <button type="button" data-id="${briefings[i].idBriefing}" class="btn-deletar"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div><!-- col-alterar -->
                                
                            <div class="col-prazo col-md-3">
                                <span class="span-cols" style="font-size: 14px; display: none;">Prazo: </span>
                                <div class="progress" style="height: 13px; background-color: #ffffff;">
                                    <div class="progress-bar" role="progressbar" style="background-color: ${corProgresso}; width: ${porcentagemPrazo}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div><!-- col-alterar -->
                        </div><!-- card-briefing-single -->
                
                        <div class="janela-float deletar_${briefings[i].idBriefing}" style="display: none;">
                            <div class="float-box">
                                <h4>Deseja realmente excluir esse briefing?</h4>
                                <button onclick="excluirBriefing(${briefings[i].idBriefing})" class="btn-confirmar-exclusao" >Excluir</button>   <button class="btn-cancelar">Cancelar</button>
                            </div>
                        </div><!-- janela-float -->
                    `);
                }
            }else{
                $("#box-card-briefing").append(`
                        <p class="text-center mt-3" style="display: block">Nenhum Briefing encontrado!</p>
                    `);
            }

            
        },
        error: function(error) {
            console.error("Erro ao obter os briefings:", error);
        }
    });
}

// Função auxiliar para obter a classe de estilo com base no estado do briefing
function getStatusClass(estado) {
    switch (estado) {
        case "Negociação":
            return "neg";
        case "Aprovado":
            return "apro";
        default:
            return "final";
    }
}

