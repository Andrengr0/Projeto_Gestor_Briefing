$(()=>{

    const btn_cadastrar_briefing = $('#cadastrar_briefing')

    btn_cadastrar_briefing.click(function () {

        // Obtém o valor do campo de data de prazo final
        let prazoFinal = $('#prazo_final').val();
        // Obtém a data atual
        let dataAtual = new Date().toISOString().split('T')[0];

        valorOrcamento = $('#orcamento').val();
        nomeCliente = $('#nome_cliente').val();
        tituloProjeto = $('#titulo').val();

        if(nomeCliente == ""){
            $('#nome_cliente_invalido').fadeIn();
            return;
        }else if(tituloProjeto == ""){
            $('#titulo_invalido').fadeIn();
            return;
        }else if(valorOrcamento < 0){
            $('#orcamento_invalido').fadeIn();
            return;
        }else if(prazoFinal <= dataAtual) {
            $('#prazo_final_invalido').fadeIn();
            return;
        }

        $("#cadastro_briefing").modal('hide')

        enviarFormulario();
    })


    function enviarFormulario() {
        $.ajax({
            type: "POST",
            url: "/admin/cadastro/briefing",
            data: $("#form-briefing").serialize(), // Serialize o formulário para enviar os dados corretamente
            success: function (response) {
                if(response.message != "Briefing cadastrado com sucesso!"){
                    window.location.href = '/?expired=true';
                }
                
                // Exibe a mensagem de sucesso
                $("#msg_modal").text(response.message);
                $(".msg-modal").fadeIn();

                // Define um evento de clique para fechar o modal após a mensagem ser exibida
                $('.btn-fechar').click(function () {
                    // Atualiza os briefings
                    atualizarBriefings();
                });

                $('body').click(function () {
                    // Atualiza os briefings
                    atualizarBriefings();
                });
                
                
            },
            error: function (error) {
                console.error("Erro:", error);
            }
        });
    }

})
