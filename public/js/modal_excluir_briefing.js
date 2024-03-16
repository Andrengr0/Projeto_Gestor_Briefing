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
        
        // Cancela a propagação do evento para evitar que outros elementos sejam afetados
        return false;
    });
});