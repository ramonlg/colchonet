//Define as ações que serão executadas nos eventos de callback no registro de avaliação.
$(function() {
    var $review = $('.review');

    //Executa uma ação antes do envio da requisição, com todos os dados já preparados.
    $review.on('ajax:beforeSend', function() {
        $(this).find('input').attr('disabled', true);
    });

    //Executa uma ação caso ocorra um erro retornado na reposta à requisição.
    $review.on('ajax:error', function() {
        replaceButton(this, 'icon-remove', '#B94A48');
    });

    //Executa uma ação em caso de a resposta da requisição seja de sucesso.
    $review.on('ajax:success', function() {
        replaceButton(this, 'icon-ok', '#468847');
    });

    //Altera o icone do input do formulário.
    function replaceButton(container, icon_class, color) {
        $(container).find('input:submit').
            replaceWith($('<i/>').
                        addClass(icon_class).
                        css('color', color));
    };

    /*
       Adiciona e remove o destaque das estrelas. Baseado no elemento passado como parâmetro,
       primeiro remove o destaque de todas as estrelas (CSS toggled) e em seguida adiciona-se
       a mesma classe apenas ao elemento em destaque e os anteriores.
    */
    function highlightStars(elem) {
        elem.parent().children('label').removeClass('toggled');
        elem.addClass('toggled').prevAll('label').addClass('toggled');
    }

    highlightStars($('.review input:checked + label'));

    var $stars = $('.review input:enabled ~ label');

    $stars.on('mouseenter', function() {
        highlightStars($(this));
    });

    $stars.on('mouseleave', function() {
        highlightStars($('.review input:checked + label'));
    });

    $('.review input').on('change', function() {
        $stars.off('mouseenter').off('mouseleave').off('click');
        $(this).parent('form').submit();
    });
});
