
// Adicione um evento de clique para o botão de confirmação de exclusão dentro do modal
function excluirBriefing(idBriefing) {

    // Realiza uma requisição AJAX para deletar o briefing
    $.ajax({
        type: "GET",
        url: "/deletar/briefing/" + idBriefing,
        success: function(response) {
            if(response.message != 'Briefing removido com sucesso!'){
                window.location.href = '/?expired=true';
            }else{
                $('.janela-float-load').css('display','none');
                // Exibe a mensagem de sucesso
                $("#msg_modal").text(response.message);
                $(".msg-modal").fadeIn();

                // Define um evento de clique para fechar o modal após a mensagem ser exibida
                $('.btn-fechar').click(function () {
                    // Atualiza a página após o modal ser fechado
                    atualizarBriefings();
                });

                $('body').click(function () {
                    // Atualiza a página após o modal ser fechado
                    atualizarBriefings();
                });
            }
        },
        error: function(error) {
            console.error("Erro ao deletar o briefing:", error);
        }
    });
};

verificarCliqueFechar();

function verificarCliqueFechar(){
    $('body').click(function(){
        $('.janela-float-load').css('display','none');
        $('.janela-float').fadeOut();
    })

    $('.float-box').click(function(e){
        e.stopPropagation;
    })
}

$(document).ready(function() {
    // Define o evento de clique para o botão de deletar
    $('.box-card-briefing').on('click', '.btn-deletar', function() {
        // Obtém o id do briefing a ser deletado
        let idBriefing = $(this).data('id');

        // Exibe a janela de confirmação de exclusão
        $('.deletar_' + idBriefing).css('display', 'block');

        // Define o evento de clique para o botão de cancelar
        $('.deletar_' + idBriefing + ' .btn-cancelar').click(function() {
            // Esconde a janela de confirmação de exclusão
            $('.deletar_' + idBriefing).css('display', 'none');
        });

        // Define o evento de clique para o botão de cancelar
        $('.btn-fechar').click(function() {
            // Esconde a janela de confirmação de exclusão
            $('.janela-float').css('display', 'none');
        });


        // Cancela a propagação do evento para evitar que outros elementos sejam afetados
        return false;
    });
});

