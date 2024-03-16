$(document).ready(function() {

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
    $('.alterar-briefing').click(function() {
        // Obtém o idBriefing armazenado no atributo data-id do botão
        let idBriefing = $(this).data('id');

        // Fecha o modal
        $("#briefing_" + idBriefing).modal('hide');

        // Encontra o formulário específico com base no idBriefing
        let formBriefing = $('#form-briefing-' + idBriefing);

        // Envia o idBriefing para a função enviarFormulario
        enviarFormulario(idBriefing, formBriefing);
    });

    function enviarFormulario(idBriefing, formBriefing) {
        $.ajax({
            type: "POST",
            url: "/admin/alterar/briefing/" + idBriefing,
            data: formBriefing.serialize(),
            success: function(data) {
                // Após a alteração bem-sucedida, atualiza a lista de briefings
                atualizarBriefings();
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

                // Reconstrói a lista de briefings com os dados atualizados
                for (let i = 0; i < briefings.length; i++) {
                    $("#box-card-briefing").append(`
                        <div class="card-briefing-single row mt-4 align-items-center">
                            <div class="col-nome col-lg-5" data-id="${briefings[i].idBriefing}">
                                <span class="nome-projeto">${briefings[i].titulo} <i class="fa fa-info-circle" aria-hidden="true"></i></span>
                            </div><!-- col-nome -->
                            <div class="col-status col-md-3">
                                <div class="status ${getStatusClass(briefings[i].estado)}">
                                    <span>${briefings[i].estado}</span>
                                </div><!-- status -->
                            </div><!-- col-status -->
                            <div class="col-alterar col-md-4">
                                <button class="btn-alterar" type="button" data-toggle="modal" data-target="#briefing_${briefings[i].idBriefing}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                <button type="button" data-id="${briefings[i].idBriefing}" class="btn-deletar"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div><!-- col-alterar -->
                        </div><!-- card-briefing-single -->
                
                        <div class="janela-float deletar_${briefings[i].idBriefing}" style="display: none;">
                            <div class="float-box">
                                <h4>Deseja realmente excluir esse briefing?</h4>
                                <a href="/deletar/briefing/${briefings[i].idBriefing}" id="btn_excluir">Excluir</a>   <button class="btn-cancelar">Cancelar</button>
                            </div>
                        </div><!-- janela-float -->
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
});
