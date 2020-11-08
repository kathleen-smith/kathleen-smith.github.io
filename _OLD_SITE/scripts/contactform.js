$(function() {
    $('input[type="submit"]').on('click', function(e) {

      var jqxhr = $.post( "submit.php", $( "#contact_form" ).serialize())
        .done(function(data) {
          $('.form-error').removeClass('error');
          console.log(data);
          if(data.errors.error) {
            $.each(data.errors.fields, function(index, value) {
              if(!$('.form-error.error-' + value).length) {
                $( "<span class='form-error error error-" + value + "'>There was an error with this field, please try again.</span>" ).insertAfter('#field_' + value).hide().slideDown(300);
              } else {
                $('.form-error.error-' + value).addClass('error');
              }
            });
            $('.form-error:not(".error")').slideUp(300).remove();
          } else {
            $('.form-error').slideUp(300).remove();
            $('#contact_form input[type="text"], #contact_form input[type="email"]').val('');
            $('#contact_form input[type="checkbox"]').removeAttr('checked');

            $('#contact_form').hide();
            $('#thank_you').show();
          }
        });
      e.preventDefault();
    });
  });