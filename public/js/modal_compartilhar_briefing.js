

function modalCompartilharBriefing(idBriefing) {

    // Limpa a div #box-card-briefing
    $("#box_modal_compartilhar_briefing").empty();

    // Constrói o modal para alterar briefing
    $("#box_modal_compartilhar_briefing").append(`
    <div class="modal fade" id="modal_compartilhar_briefing" tabindex="-1" role="dialog" aria-labelledby="CompartilharBriefing" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="TituloModal">Compartilhar briefing</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
        
                <form id="form-compartilhar-briefing-${idBriefing}" enctype="multipart/form-data" method="post">
        
                    <label for="email_usuario_compart" style="display: block;">Email do usuário que deseja compartilhar: <span>(O usuário deve estar cadastrado)</span></label>
                    <input type="text" name="email_usuario_compart" id="email_usuario_compart" placeholder="Ex.: joaozinho@gmail.com">
                    <span id="email_usuario_invalido" style="display: none; color: #ff0000;">Usuário não existe</span>
        
                </form>
        
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary alterar-briefing" onclick='compartilharBriefing(${idBriefing})'>Compartilhar Briefing</button>
            </div>
            </div>
        </div>
        </div> <!-- Fim do modal -->
    `);

        // Abre o modal após a adição do conteúdo
        $("#modal_compartilhar_briefing").modal('show');
    
}


function compartilharBriefing(idBriefing){

    // Encontra o formulário específico com base no idBriefing
    let formBriefing = $('#form-compartilhar-briefing-' + idBriefing);

    // Extrai o email do usuário do formulário
    let emailUser = formBriefing.find('input[name="email_usuario_compart"]').val();

    $("#modal_compartilhar_briefing").modal('hide');

    $.ajax({
        type: "POST",
        url: "/admin/compartilhar/briefing/"+idBriefing+"/"+emailUser,
        success: function(briefing) {
            $('.janela-float-load').css('display','none');
            // Define o texto da mensagem
            $("#msg_modal").text("Briefing #"+briefing.idBriefing+" compartilhado!");
            $(".msg-modal").fadeIn();
        },
        error: function(error) {
            $("#email_usuario_invalido").fadeIn();
            console.error("Erro ao compartilhar o briefing:", error);
        }
    });
}

