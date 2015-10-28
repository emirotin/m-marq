var _ = require('lodash');
var pitft = require("pitft");

var fb = pitft("/dev/fb1", true); // Returns a framebuffer in double buffering mode
console.log("starting node.js script...")

// Clear the back buffer
fb.clear();


var LINE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var INTERVAL = 1600;

var index = _.parseInt(process.env.INDEX || '1') - 1;
var count = _.parseInt(process.env.COUNT || '1') - 1;
var lineLength = LINE.length;

var xMax = fb.size().width;
var yMax = fb.size().height;

var draw = function() {
  var time = Date.now();
  var shift = (~~(time / INTERVAL) + index) % lineLength;

  fb.clear();
  fb.color(1, 1, 1);
  fb.font("fantasy", 320, true);
  var letter = _.sample();
  fb.text(xMax / 2 - 30, yMax / 2, LINE[shift], true, 0);
  fb.blit();
};

draw();
setInterval(function() {
  draw();
}, INTERVAL / 2);
