var video;
function playVideo() {
  console.log("playVideo called");
  video.play();
}

(function($){

  
  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
      get: function(){
          console.log(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
          return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
      }
  })

  // Once DOM is ready.
  $(document).ready(function(){
    video = document.getElementById("bg-video");
    $('#bg-video').on('loadstart', function (event) {
      $('#loader').fadeIn();
    });

    $('#bg-video').on('canplay', function(event) {
      setTimeout(function() {
        if (video.playing) {
            $('#loader').fadeOut();
        }

        if (!video.playing) {
            $('#loader').fadeOut();
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
              $('#btn-play-bg').show();
            }
        }
      }, 1000);
    });

    $('#btn-play-bg').on('click', function() {
      $(this).hide();
      playVideo();
    });

    if(!$('#container').hasClass('is-project')) {
      return;
    }
  	var $quicklinks = $('.projects-quicklinks');
  	var $quicklinksOffset = $quicklinks.offset().top;
  	var $quicklinksHeight = $quicklinks.height();

  	if (($quicklinksOffset + $quicklinksHeight) < $(window).height()) {
  		$quicklinks.addClass('sticky');
  	}

  	$(document).on('scroll', function(e) {

  		if ($(window).width() >= 768) {
  			
	  		var $scrollDistance = $(document).scrollTop();
	  		var $windowHeight = $(window).height();
	  		var visibleDistance = $windowHeight + $scrollDistance;
	  		var quicklinksBottom = $quicklinksOffset + $quicklinksHeight;

	  		if (visibleDistance >= quicklinksBottom  && !$quicklinks.hasClass('sticky')) {
	  			$quicklinks.addClass('sticky');
	  		} else if (visibleDistance < quicklinksBottom && $quicklinks.hasClass('sticky')) {
	  			$quicklinks.removeClass('sticky');
	  		}
  		}
  	});

  });
  

}(jQuery));