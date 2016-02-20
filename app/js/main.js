$(document).ready(function() {
	// column
	$('.text_info').columnize({width:560});

	// select
	$(".js-example-basic-single").select2({
  		minimumResultsForSearch: Infinity
		});
});