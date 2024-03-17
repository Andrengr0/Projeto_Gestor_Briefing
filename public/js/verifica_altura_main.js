$(document).ready(function() {
    // Função para ajustar a altura do main
    function ajustarAlturaMain() {
        var windowHeight = $(window).height(); // Altura da janela do navegador
        var mainTop = $('main').offset().top; // Posição superior da main em relação ao documento
        var mainHeight = windowHeight - mainTop; // Altura ajustada do main

        // Define a altura ajustada do main
        $('main').height(mainHeight);
    }

    // Executa a função quando a página é carregada e quando ocorre o evento de redimensionamento
    $(window).on('load resize', ajustarAlturaMain);
});
