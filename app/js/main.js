var moduleShop = (function () {

    var init = function () {          
        _setUpListeners();
        _slider();
        _select();
        _columnizer();
        _firstCome();
    };

    var _setUpListeners = function () {
        $('.reset-filter').on('click', _resetCheckbox);
        $('.sort__view').on('click', _changeSortView);
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

