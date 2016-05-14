/*
js/windows.js
Created on 5/14/16 by TSPrograms.
Copyright © 2016 TSPrograms.
*/

var electron = require('electron');
var BrowserWindow = require('browser-window');

var tabs = require('./tabs');
var prefs = require('./prefs');

exports.Window = function(initialURL, options) {
  this.browserWindow = new BrowserWindow(options);
  this.tabs = [
    new tabs.Tab(initialURL)
  ];

  this.browserWindow.loadUrl('file://' + __dirname + '/app/index.html');
};
