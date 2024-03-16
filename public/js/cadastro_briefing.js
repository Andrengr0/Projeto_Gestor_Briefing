$(()=>{

    const btn_cadastrar_briefing = $('#cadastrar_briefing')

    btn_cadastrar_briefing.click(function () {

        enviarFormulario();
    })


    function enviarFormulario() {
        $.ajax({
            type: "POST",
            url: "/admin/cadastro/briefing",
            data: $("#form-briefing").serialize(), // Serialize o formulário para enviar os dados corretamente
            success: function (data) {
                alert("Briefing cadastrado com sucesso!");
                location.reload();
            },
            error: function (error) {
                console.error("Erro:", error);
            }
        });
    }

})
