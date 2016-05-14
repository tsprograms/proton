/*
js/prefs.js
Created on 5/14/16 by TSPrograms.
Copyright © 2016 TSPrograms.
*/

'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');

const app = electron.app || electron.remote.app;
const dataPath = path.join(app.getPath('userData'), 'prefs.json');

const defaults = {
  browser: {
    newtab: {
      url: 'proton:blank'
    }
  }
};

var prefs;

var getKeys = function(obj, refs) {
  var refs = refs || [];
  var list = [];
  if (typeof obj !== 'object') {
    return [obj];
  }
  for (var i in obj) {
    if (obj.hasOwnProperty(i) && refs.indexOf(obj[i]) === -1) {
      list = list.concat(getKey(obj[i]));
    }
  }
};

exports.get = function(key) {
  key = key.toString().split('.');
  var val = prefs;
  for (var i = 0; i < key.length; ++i) {
    if (typeof val !== 'object') {
      return;
    }
    val = val[key[i]];
  }
  if (typeof val === 'object') {
    return; // Only final values can be returned from prefs - not objects
  }
  return val;
};

exports.has = function(key) {
  return (typeof exports.get(key) !== 'undefined');
};

exports.set = function(key, value) {
  key = key.toString().split('.');
  var val = prefs;
  for (var i = 0; i < key.length - 1; ++i) {
    if (typeof val !== 'object') {
      return false;
    }
    val = val[key[i]];
  }
  if (typeof val === 'object') {
    val[key[key.length - 1]] = value;
    return true;
  }
  return false;
};

exports.reset = function() {
  prefs = JSON.parse(JSON.stringify(defaults))
};

exports.allKeys = function() {
  return getKeys(prefs);
};

// NOTE: Nothing in the file system is actually changed UNLESS
//  exports.update is called (reset, set, etc. don't change file otherwise)
exports.update = function() {
  fs.writeFileSync(dataPath, JSON.stringify(prefs), {
    encoding: 'utf8'
  });
};


try {
  prefs = JSON.parse(fs.readFileSync(dataPath, {
    encoding: 'utf8'
  }));
}
catch (e) {
  console.error('Error reading or parsing ' + dataPath + ' -\n' + e);
  exports.reset();
}
