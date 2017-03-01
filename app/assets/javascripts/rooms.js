$(function() {
  var $review = $('.review');

  $review.on('ajax:beforeSend', function() {
    $(this).find('input').attr('disabled', true);
  });

  $review.on('ajax.error', function() {
    replaceButton(this, 'fa-check', '#B94A48');
  });

  $review.on('ajax:success', function() {
    replaceButton(this, 'fa-times', '#468847');
  });

  function replaceButton(container, icon_class, color) {
    $(container).find('input:submit').
      replaceWith($('<i/>').
        addClass(icon_class).
        css('color', color));
  };
});
