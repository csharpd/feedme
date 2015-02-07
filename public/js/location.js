"use strict";

(function() {
  var root = this;
  var previousFeedme = root.feedme;

  var feedme = function() {
  }

  feedme.noConflict = function() {
    root.feedme = previousFeedme;
    return feedme;
  }

  feedme.locate = function(navigator, callback) {
    navigator.geolocation.getCurrentPosition(callback);
  };

  feedme.setCurrentLocation = function(navigator) {
    this.locate(navigator, function(position) {
      window.currentLocation = position.coords;
    });
  };

  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = feedme;
    } 
    exports.feedme = feedme;
  } else {
    root.feedme = feedme;
  }
}).call(this);
