// Verifica se a sessão expirou e exibe uma mensagem, se aplicável
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const expired = urlParams.get('expired');
    if (expired === 'true') {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
    }
});
