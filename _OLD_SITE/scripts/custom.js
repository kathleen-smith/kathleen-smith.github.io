$(document).ready(function(){
    
    $('#nav-icon3').click(function(){
		$(this).toggleClass('open');
        $( ".nav" ).slideToggle( "slow", function() {
            // Animation complete.
        });
	});
});