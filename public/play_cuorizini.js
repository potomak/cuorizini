soundManager.url = '/sm2/swf/';
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