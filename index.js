var bycreatorScrolling = (function() {
  'use strict';

  var limit = 0,
    counter = 0,
    $loading;

  function scrollTo(offset){

    $(window).scrollTop(offset);

  }

  function loadMore() {

    $('.list').after( $loading );
    $(document).off('scroll', scrollController);
    $('.load-more').addClass('is-hidden');

    setTimeout(function(){

      $loading.remove();
      $('.list').append( $('.hidden-content').html() );

      $('.list').find('.element').not('.element-in').each(function(i){

        var $this = $(this);

        setTimeout(function(){

          requestAnimationFrame( function(){ $this.addClass('element-in') } )

        }, ( 10 * Math.ceil( (i+1)/3 )) )

      })

      $('.message .bottom').text( $('.list').height() );
      
      $(document).on('scroll touchmove', scrollController);

      if( counter == limit ){

        $('.load-more').removeClass('is-hidden');

      }
    }, 400);
    

  }

  function scrollController() {

    $('.message .scroll').text( $(window).scrollTop() );

    if( $(window).scrollTop() + $(window).height() >=  $('.list').height() && counter < limit ){

      $('.message').addClass('ok');
      loadMore();
      counter+=1;

      return;

    } 

    $('.message').removeClass('ok');
    

  }

  function bindUI() {

    $(document).on('scroll', scrollController);


    $('.load-more').on('click', loadMore);

  }

  

  return {
    init:init
  };

}());

$(function(){

  bycreatorScrolling.init(1);

})