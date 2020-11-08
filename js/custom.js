$( function() {
	$( "#tabs" ).tabs();
});

$(document).ready(function(){
	var emailExample = $('.email-example');
	var closeModal = $('.close-modal');

	emailExample.on( "click", function(e) {
	  e.preventDefault();
		$(this).addClass('active');
	});

	closeModal.on("click", function(e){
		e.stopPropagation();
		$(this).parent().addClass('test');
		$(this).parent().removeClass('active');
	});

});
