

function modalAlterarBriefing(idBriefing) {
    $.ajax({
        type: "GET",
        url: "/obter/briefing/" + idBriefing,
        success: function(briefing) {
            // Após a busca bem-sucedida, exibe o modal para alterar briefing

            // Limpa a div #box-card-briefing
            $("#box_modal_alterar_briefing").empty();

            // Obtém a data atual
            const hoje = new Date().toISOString().split('T')[0];

            // Obtém a data de briefing.prazoFinal no formato "YYYY-MM-DD"
            const prazoFinalFormatado = new Date(briefing.prazoFinal).toISOString().split('T')[0];

            // Constrói o modal para alterar briefing
            $("#box_modal_alterar_briefing").append(`
            <div class="modal fade" id="modal_alterar_briefing" tabindex="-1" role="dialog" aria-labelledby="AlterarBriefing" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="TituloModal">Alterar briefing</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                
                        <form id="form-briefing-${briefing.idBriefing}" enctype="multipart/form-data" method="post">
                
                            <label for="nome_cliente_alt" style="display: block;">Nome do cliente:</label>
                            <input type="text" name="nome_cliente_alt" id="nome_cliente_alt" placeholder="Ex.: VivaMoveis..." value="${briefing.nomeCliente}">
                            <span id="nome_cliente_invalido_alt" style="display: none; color: #ff0000;">Campo obrigatório</span>
                            
                            <label for="titulo_alt" class="mt-4" style="display: block;">Título do projeto:</label>
                            <input type="text" name="titulo_alt" id="titulo_alt" placeholder="Ex.: Site para loja VivaMoveis..." value="${briefing.titulo}">
                            <span id="titulo_invalido_alt" style="display: none; color: #ff0000;">Campo obrigatório</span>
                
                            <label for="descricao_alt" class="mt-4" style="display: block;">Descrição do projeto:</label>
                            <textarea id="descricao_alt" name="descricao_alt" placeholder="Ex.: Descreva aqui o projeto..">${briefing.descricao}</textarea>
                
                            <label for="estado_briefing_alt" class="mt-4">Estado do projeto:</label>
                
                            
                            <select class="estado_briefing" name="estado_briefing_alt" id="estado_briefing_alt">
                                ${briefing.estado === "Negociação" ? 
                                    `<option selected value="Negociação">Negociação</option>
                                        <option value="Aprovado">Aprovado</option>
                                        <option value="Finalizado">Finalizado</option>` :
                                    briefing.estado === "Aprovado" ?
                                    `<option value="Negociação">Negociação</option>
                                        <option selected value="Aprovado">Aprovado</option>
                                        <option value="Finalizado">Finalizado</option>` :
                                    `<option value="Negociação">Negociação</option>
                                        <option value="Aprovado">Aprovado</option>
                                        <option selected value="Finalizado">Finalizado</option>`}
                            </select>
                
                            <label for="orcamento_alt" class="mt-4" style="display: block;">Orçamento do projeto:</label>
                            <span>R$ </span><input style="display: inline-block;" type="text" class="orcamento" name="orcamento_alt" id="orcamento_alt" placeholder="Ex.: 5.000" value="${briefing.orcamento}">
                            <span id="orcamento_invalido_alt" style="display: none; color: #ff0000;">Valor inválido</span>
                
                            <label for="prazo_final_alt" class="mt-4" style="display: block;">Data de prazo final:</label>
                            <input type="date" class="prazo_final" name="prazo_final_alt" id="prazo_final_alt" value="${prazoFinalFormatado}" min="${hoje}">
                            <span id="prazo_final_invalido_alt" style="display: none; color: #ff0000;">Data inválida</span>
                
                        </form>
                
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary alterar-briefing" onclick='alterarBriefing(${briefing.idBriefing})'>Alterar Briefing</button>
                    </div>
                    </div>
                </div>
                </div> <!-- Fim do modal -->
            `);

                // Abre o modal após a adição do conteúdo
                $("#modal_alterar_briefing").modal('show');
                            
        },
        error: function(error) {
            // Define o texto da mensagem
            $("#msg_modal").text("Erro ao tentar alterar, sua sessão pode ter expirado!");
            $(".msg-modal").fadeIn();

            // Define um evento de clique para fechar o modal após a mensagem ser exibida
            $('.btn-fechar').click(function () {
                // Atualiza a página após o modal ser fechado
                location.reload();
            });

            $('body').click(function () {
                // Atualiza a página após o modal ser fechado
                location.reload();
            });

            console.error("Erro ao alterar o briefing:", error);
        }
    });
}
