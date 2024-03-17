// Obtém a data atual
var hoje = new Date();

// Adiciona um dia à data atual
hoje.setDate(hoje.getDate() + 1);

// Formata a data para o formato "YYYY-MM-DD"
var amanha = hoje.toISOString().split('T')[0];

// Define amanhã como o valor mínimo para o campo de entrada de data
$('.prazo_final').attr('min', amanha);