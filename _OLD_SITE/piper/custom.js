$(document).ready(function(){
    $('#click').click(function(e){
        e.preventDefault();
        $('.pop-up').show();
    });

    $('.close').click(function(e){
        e.preventDefault();
        $('.pop-up').hide();
    });


    $('#toggle').click(function(e) {
        e.preventDefault();
        $('.hidden').slideToggle("slow");
    });
});