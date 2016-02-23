$(document).ready(function() {
	// column
	$('.text_info').columnize({width:560});

	// select
	$(".js-example-basic-single").select2({
  		minimumResultsForSearch: Infinity
		});

	// Иконка при наведении на ссылку-триггер	

   	$('.filters__title.active').hover(function () {
      		$(this).prepend('<i class="close_filters"></i>')
   		}, function () {
      		$('.close_filters').remove()
    });	
  	 $('.filters__title.no_active').hover(function () {
      		$(this).prepend('<i class="open_filters"></i>')
   		}, function () {
      		$('.open_filters').remove()
    });   
 

    //аккордеон
    $('.filters__title').on('click', function (e) {
    	e.preventDefault();

    	var $this = $(this),
    		item = $this.closest('.basic__item'),
    		content = item.find('.basic_inner'),
    		duration = 300;

    	if($this.hasClass('no_active')) {
    		$this.removeClass('no_active')
    		$this.addClass('active')
    		content.stop(true, true).slideDown(duration);
   	$('.filters__title.active').hover(function () {
   			$('.open_filters').remove()
      		$(this).prepend('<i class="close_filters"></i>')
   		}, function () {
      		$('.close_filters').remove()
    });	    		
   		} else { 
   			content.stop(true, true).slideUp(duration);
	   		$this.removeClass('active');
	   		$this.addClass('no_active');
	 $('.filters__title.no_active').hover(function () {
    		$('.close_filters').remove()
      		$(this).prepend('<i class="open_filters"></i>')
   		}, function () {
      		$('.open_filters').remove()
    });  		
   		};
    });

    //очистка чекбоксов
    $(".reset-filter").on('click', function (e) {
    	e.preventDefault();

    	var $this = $(this),
    		item = $this.siblings('.checkbox__item'),
    		inputs = item.find('input:checkbox');

    	$.each(inputs, function() {
    		inputs.removeAttr("checked");
        });

    });


// Слайдер в сайдбаре
$(function() {
  $( ".price_range__slider" ).slider({
      range: true,
      min: 0,
      max: 30000,
      values: [ 700, 13000 ],
      slide: function( event, ui ) {
        $( "#price_range1" ).val(ui.values[ 0 ]);
        $( "#price_range2" ).val(ui.values[ 1 ]);
      }
    });
    $( "#price_range1" ).val(  $( ".price_range__slider" ).slider( "values", 0 ));
    $( "#price_range2" ).val(  $( ".price_range__slider" ).slider( "values", 1 ));

  });
    
});