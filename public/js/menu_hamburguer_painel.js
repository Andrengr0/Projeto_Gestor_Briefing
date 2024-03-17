$(document).ready(function(){

    let el = $('.btn-menu-mobile');

    $('#hamburger').change(function(){
        if(this.checked) {
            $('aside').css('left', '0px');
            $('.btn-menu-mobile').css('left', '200px');
        } else {
            $('aside').css('left', '-200px');
            $('.btn-menu-mobile').css('left', '0px');
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() <= 1105) {
           // Esconda o menu
           $('aside').css('left', '-200px');
           $('#hamburger').prop('checked', false);
           $('.btn-menu-mobile').css('left', '0px');
        } else {
            $('aside').css('left', '0px');
        }
    });

    $('aside a').click(function(){
        if($(window).width() <= 1105){
            // Esconda o menu
            $('#hamburger').prop('checked', false);
            $('aside').css('left', '-200px');
            $('.btn-menu-mobile').css('left', '0px');
        }
    })

    $('body').click(function() {
        if($(window).width() <= 1105){
            // Esconda o menu
            $('#hamburger').prop('checked', false);
            $('aside').css('left', '-200px');
            $('.btn-menu-mobile').css('left', '0px');

            $(el).click(function(e){
                e.stopPropagation();
            })
        }
    });
});