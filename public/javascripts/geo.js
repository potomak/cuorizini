var Geo = (function() {

  var WATCH_ID;
  var POSITION;
  var GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    maximumAge:         600000,
    timeout:            30000   // 30 seconds
  };

  function _positionSucceeded(position) {
    POSITION = position;
  }

  function _positionFailed(error) {
    POSITION = null;
  }

  return {
    // initialize geolocation
    initGeolocation: function() {
      var geo = navigator.geolocation;
      if (typeof geo === 'undefined') {
        // We don't have W3C geolocation. Try Gears.
        if (typeof google !== 'undefined' && google.gears &&
        google.gears.factory.create) {
          geo = google.gears.factory.create('beta.geolocation');
        }
      }

      // If we have a geo object with either of these approaches, proceed
      // as planned. If not, try BlackBerry, and then fall back to Google
      // Ajax API.
      if (typeof geo !== 'undefined') {
        WATCH_ID = geo.watchPosition(
          _positionSucceeded,
          _positionFailed,
          GEOLOCATION_OPTIONS
        );
      }
    },
    
    // Attempt to geolocate the user.
    getLocation: function() {
      var lat, lng;
      if (POSITION) {
        var coords = POSITION.coords;
        return [coords.latitude, coords.longitude];
      }
      else if (google.loader.ClientLocation) {
        return [google.loader.ClientLocation.latitude, google.loader.ClientLocation.longitude];
      }

      return false;
    }
  };
})();