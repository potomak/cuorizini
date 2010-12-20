// Sound Manager setup

soundManager.url = '/javascripts/sm2/swf/';
soundManager.flashVersion = 9; // optional: shiny features (default = 8)
soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in
soundManager.useHTML5Audio = true;

soundManager.onready(function() {
  if (soundManager.supported()) {
    // SM2 is ready to go!
    soundManager.createSound({
      id: 'cuorizini',
      url: '/cuorizini.mp3',
      autoLoad: true,
      autoPlay: false,
      volume: 50
    });
  } else {
    // unsupported/error case
  }
});

// Bubble Engine setup

var cuorizini = null;
var blocked = false;
$(document).ready(function() {
  var w = $('#cuorizini_container').width();
  var h = $('#cuorizini_container').height();
  var left = $('#cuorizini_container').position().left;
  var top = $('#cuorizini_container').position().top;
  var x = left + (w/2);
  var y = top + (h/2);
  cuorizini = $('fn').BubbleEngine({
    particleSizeMin:           10,
    particleSizeMax:           60,
    particleSourceX:           x,
    particleSourceY:           y,
    particleDirection:         'center',
    particleAnimationDuration: 5000,
    particleAnimationVariance: 2000,
    particleScatteringX:       500,
    particleScatteringY:       300,
    imgSource:                 '/images/heart.png',
    RenewBubbles:              'off',
    gravity:                   -100,
    onStart:                   function(){blocked = true;},
    onComplete:                function(){blocked = false;}
  });
});

// Events

function makes_your_life_sweet() {
  if (!blocked)
    cuorizini.addBubbles(20);
  soundManager.play('cuorizini');
  return false;
}