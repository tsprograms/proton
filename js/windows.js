/*
js/windows.js
Created on 5/14/16 by TSPrograms.
Copyright © 2016 TSPrograms.
*/

'use strict';

var electron = require('electron');
var BrowserWindow = require('browser-window');

var tabs = require('./tabs');
var prefs = require('./prefs');

exports.Window = function(initialURL, options) {
  var focusedTab = 0;
  
  this.browserWindow = new BrowserWindow(options);
  this.tabs = [
    new tabs.Tab(initialURL)
  ];

  this.focusTab = function(tabID) {
    if (tabID >= 0 && tabID < this.tabs.length) {
      focusedTab = tabID;
      return true;
    }
    return false;
  };
  this.newTab = function() {
    var id = this.tabs.length;
    this.tabs.push(new Tab());
    this.focus(id);
    return id;
  };
  this.getFocusedTab = function() {
    return this.tabs[focusedTab];
  };

  this.browserWindow.loadUrl('file://' + __dirname + '/app/index.html');
};
