/*
proton/js/tabs.js
Created 5/13/16.
Copyright © 2016 TSPrograms.
*/

'use strict';

var prefs = require('./prefs');
var url   = require('url');

var newTabURL = prefs.get('browser.newtab.url');

var Tab = function(initialURL) {
  var self = this;
  var currentURL = initialURL || newTabURL; // The default URL is browser.newtab.url from prefs

  // Tab constructor does not actually load URLs itself, so listeners must be provided
  var listeners = {
    'load': []
  };

  self.reload = function() {
    var parsedURL = url.parse(currentURL, false, true);
    var isBrowser = (parsedURL.protocol === 'proton:');
    for (var i = 0; i < listeners[load].length; ++i) {
      if (typeof listeners[i] === 'function') {
        listeners[i](isBrowser);
      }
    }
  };

  // Load listeners are passed an argument isBrowser, which states whether
  //  the URL should be loaded with special privileges.
  self.listen = function(event, callback) {
    if (listeners.hasOwnProperty(event) && typeof callback === 'function') {
      listeners[event].push(callback);
      return true;
    }
    // If an invalid event name is passed or callback isn't a function
    return false;
  };

  Object.defineProperty(self, 'url', {
    get: function() {
      return currentURL;
    },
    set: function(val) {
      currentURL = val;
      self.reload();
    }
  });
};
