$(()=>{
    // Adicione um manipulador de eventos delegado para os botões de alteração de briefing
    $('#box-card-briefing').on('click', '.col-nome', function() {
        // Obtém o idBriefing armazenado no atributo data-id do botão
        let idBriefing = $(this).data('id');

        // Chama a função buscarBriefing para exibir o modal com os detalhes do briefing
        buscarBriefing(idBriefing);
    });

    // Função para buscar e exibir os detalhes de um briefing específico
    function buscarBriefing(idBriefing) {
        let modalExistente = $('#ModalInfo');
        if (modalExistente.length > 0) {
            // Se o modal já existe, remover para criar um novo
            modalExistente.remove();
        }
        $.ajax({
            type: "GET",
            url: `/obter/briefing/${idBriefing}`, // Assumindo que sua rota no servidor para obter um briefing específico seja '/obter/briefing/:idBriefing'
            success: function(briefing) {

                let descricaoDecodificada;
                try {
                    const descricaoTemp = briefing.descricao.replace(/\n/g, 'QUEBRADELINHA');
                    descricaoDecodificada = unescape(descricaoTemp);
                    descricaoDecodificada = descricaoDecodificada.replace(/QUEBRADELINHA/g, '<br>').replace(/-\s/g, '• ');
                } catch (e) {
                    console.error(e);  // Log the error
                    descricaoDecodificada = briefing.descricao;  // Use the original string as a fallback
                };


                // Construir o modal com os detalhes do briefing
                let modalHTML = `
                    <div class="modal fade" id="ModalInfo" tabindex="-1" role="dialog" aria-labelledby="ModalInfo" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="TituloModalLongo">Informações do Briefing</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h6 class="mt-2">Nome do cliente:</h6>
                            <p>${briefing.nomeCliente}</p>

                            <h6 class="mt-4">Título do projeto:</h6>
                            <p>${briefing.titulo}</p>

                            <h6 class="mt-4">Descrição do projeto:</h6>
                            <p>${descricaoDecodificada}</p>

                            <h6 class="mt-4">Estado:</h6>
                            <p>${briefing.estado}</p>

                            <h6 class="mt-4">Data de criação:</h6>
                            <p>${briefing.data}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        </div>
                        </div>
                    </div>
                    </div>
                `;

                // Adicionar o modal ao corpo do documento
                $('body').append(modalHTML);

                // Abrir o modal
                $('#ModalInfo').modal('show');
            },
            error: function(error) {
                console.error("Erro ao buscar o briefing:", error);
                alert("Erro ao buscar o briefing. Por favor, tente novamente mais tarde.");
            }
        });
    }

})