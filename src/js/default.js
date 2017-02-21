// Default JavaScript Functions and Initiations
$(window).load(function() {

  // Functions go here...
  $('#wrapper').fadeIn();

  var currentLang = 'en';
  $('.en').show();
  $('.zh').hide();

  $('.lang-toggle').click(function() {
    if (currentLang == 'en') {
      $('.en').hide();
      $('.zh').show();
      currentLang = 'zh';
    }
    else if (currentLang == 'zh') {
      $('.zh').hide();
      $('.en').show();
      currentLang = 'en';
    }
  });

  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  $('img.rollover').hover(
    function() {
      var old = $(this).attr('src');
      $(this).attr('src', $(this).attr('data-src'));
      $(this).attr('data-src', old);
    },
    function() {
      var old = $(this).attr('src');
      $(this).attr('src', $(this).attr('data-src'));
      $(this).attr('data-src', old);
    }

  );

  setTimeout(
    function() {
      $('.preloader').hide();
      $('.page').fadeIn();
    }, 800);

  // Comic-Reader

  $('.comic-reader .speech-bubble').each(function() {
    var $speechBubble = $(this);
    loadSpeechBubble($speechBubble);
    console.log('Loaded speech bubble at (' + $speechBubble.css('top') + ', ' + $speechBubble.css('left') + ')');
  });

  $('.comic-reader .speech-bubble').hover(
    function() {
      $(this).css('opacity', 1);
    },
    function() {
      $(this).css('opacity', 0);
    }
  );

  function loadSpeechBubble($speechBubble) {
    $speechBubble.css(
      scaleBubble(
        {
          'width': $speechBubble.data('width'),
          'height': $speechBubble.data('height'),
          'top': $speechBubble.data('x'),
          'left': $speechBubble.data('y'),
          'font': $speechBubble.data('font')
        },
        $speechBubble.parent('.page').width(),
        $speechBubble.parent('.page').height()
      )
    );
  }

  function scaleBubble(bubble, currentWidth, currentHeight) {
    var w = bubble.width;
    var h = bubble.height;
    var x = bubble.top;
    var y = bubble.left;
    var f = bubble.font;
    return {
      'width': (w/960)*currentWidth,
      'height': (h/1242)*currentHeight,
      'top': (x/1242)*currentHeight,
      'left': (y/960)*currentWidth,
      'font-size': (f/960)*currentWidth*0.01 + 'rem'
    }
  }

  $(window).resize(function() {
    $('.comic-reader .speech-bubble').each(function() {
      var $speechBubble = $(this);
      loadSpeechBubble($speechBubble);
    });
  });
  
}); // end document ready
