/*
main.js
Created 5/13/16 by TSPrograms.
Copyright © 2016 TSPrograms.
*/

'use strict';

var app = require('app');
var windows = require('./js/windows');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new windows.Window();
});
