/*
app/main.js
Created on 5/14/16 by TSPrograms.
Copyright © 2016 TSPrograms.
*/

const electron = require('electron');

const $ = require('./jquery');

const ipcRenderer = electron.ipcRenderer;

const appWindow = ipcRenderer.sendSync('sync', 'appWindow');

var tabs, utils, content;

$(document).ready(() => {
  tabs = $('#tabs');
  utils = $('#utils');
  content = $('#content');
  
  var focusedID = appWindow.getFocusedID();
  var html = (new Array(appWindow.tabs.length)).join('<div class="tab"></div>');
  tabs.html(html);
  $('.tab').append(
    $('<span class="title"></span>').text(i => appWindow.tabs[i].title),
    $('<img class="favicon" alt="favicon">').attr('src', i => appWindow.tabs[i].favicon)
  ).eq(focusedID).addClass('focused');
});
