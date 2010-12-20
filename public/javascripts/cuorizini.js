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
  $('#make_your_life_sweet').click(makes_your_life_sweet);
  
  cuorizini = $('fn').BubbleEngine({
    particleSizeMin:           10,
    particleSizeMax:           60,
    particleDirection:         'center',
    particleAnimationDuration: 5000,
    particleAnimationVariance: 2000,
    particleScatteringX:       500,
    particleScatteringY:       300,
    imgSource:                 '/images/heart.png',
    RenewBubbles:              'off',
    gravity:                   -100
  });
});

// Events

function makes_your_life_sweet(clickEvent) {
  // generate 1 bubble at mouse click very fast (1 msec)
  cuorizini.addBubbles(1, clickEvent.pageX, clickEvent.pageY, 1);
  soundManager.play('cuorizini');
  return false;
}