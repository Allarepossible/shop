var moduleShop = (function () {

    var init = function () {          
        _setUpListeners();
        _slider();
        _select();
        _columnizer();
        _firstCome();
    };

    var _setUpListeners = function () {
        $('.filter__title').on('click', _accordeon);
        $('.color__link').on('click', _colorChange);
        $('.reset-filter').on('click', _resetCheckbox);
        $('.sort__view').on('click', _changeSortView);
        $('.slideshow_pic').on('click', _slideShow);
    };

    // Аккордеон
    var _accordeon = function (e) {
        e.preventDefault();

        var $this = $(this),
            item = $this.closest('.filters__item'),
            content = item.find('.filter'),
            duration = 300;

        if($this.hasClass('active')) {
            content.stop(true, true).slideUp(duration);
        } else {
            content.stop(true, true).slideDown(duration);
        }

        $this.toggleClass('active');
    };

    // Фильтр по цветам
    var _colorChange = function (e) {
      e.preventDefault();
      $(this).toggleClass('choosen');
    };

    //очистка чекбоксов
    var _resetCheckbox = function (e) {
        e.preventDefault();

        var $this = $(this),
            item = $this.siblings('.checkbox__item'),
            inputs = item.find('input:checkbox');

        $.each(inputs, function() {
            inputs.removeAttr('checked');
        });
    };

    // Вид продукции
    var _changeSortView = function (e) {
      e.preventDefault();
      //удаляем активный класс
      for (var i = 0; i < 3; i++) {
        $('.sort__view'+ i +'-hover').removeClass('sort__view'+ i +'-hover');
      }
      var items = $(this).closest('.sort__view-item'),
          item = $(this).children(),
          itemPosition = items.index(),
          viewActiveClass = 'sort__view'+ itemPosition +'-hover',
          content = $('#content').find('ul').eq(0),
          contentClass = 'products_list'+ itemPosition +'';

      //меняем вид продукции и добавляем активный класс
      if(!content.hasClass(contentClass)){
          content.removeClass();
          content.addClass(contentClass);
          item.addClass(viewActiveClass);
      };
    };

    // Слайдер с ценой
    var _slider = function() {
      $( '.price-range__slider' ).slider({
          range: true,
          min: 0,
          max: 30000,
          values: [ 700, 13000 ],
          slide: function( event, ui ) {
            $( '#price-range1' ).val(ui.values[ 0 ]);
            $( '#price-range2' ).val(ui.values[ 1 ]);
          }
        });
        $( '#price-range1' ).val(  $( '.price-range__slider' ).slider( 'values', 0 ));
        $( '#price-range2' ).val(  $( '.price-range__slider' ).slider( 'values', 1 ));
    };

    // Две колонки текста
    var _columnizer = function() { 
      $('.text_info').columnize({width:560});
    }

    // select
    var  _select = function() {
      $('.js-example-basic-single').select2({
          minimumResultsForSearch: Infinity
      });
    }

    // slideshow
    var _slideShow = function(e) {
      e.preventDefault();

      var item = $(this).closest('.mini__item'),
          container = $(this).closest('.products__slideshow'),
          display = container.find('.slideshow'),
          path = item.find('img').attr('src'),
          duration = 200;

      if (!item.hasClass('mini__item-active')) {
        item.addClass('mini__item-active').siblings().removeClass('mini__item-active');
        display.find('img').fadeOut(duration, function() {
          $(this).attr('src', path).fadeIn(duration);
        });
      };
    };

    // first
    var _firstCome = function() {
      var items = $('.mini__list');
      for (var i = 0; i < items.length; i++) {
        $('.mini__list')[i].children[0].setAttribute('class', 'mini__item mini__item-active')
      }
    }

    return {
        init : init
    };
    
}) ();

window.onload = moduleShop.init();

