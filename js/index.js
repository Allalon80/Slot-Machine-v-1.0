
$(document).ready(function(){

	$('#st-accordion').accordion();
	$('textarea').autogrow();

	$('.nav ul li a').bind('click',function(event){
		var $anchor = $(this);

		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 500,'easeInOutExpo');
		event.preventDefault();
	});

});