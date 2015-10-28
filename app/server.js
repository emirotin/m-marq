var pitft = require("pitft");

var fb = pitft("/dev/fb1", true); // Returns a framebuffer in double buffering mode
console.log("starting node.js script...")

// Clear the back buffer
fb.clear();


var LINE = 'Hello, Moscow!';
var INTERVAL = 1600;

var index = parseInt(process.env.INDEX || '1', 10) - 1;
LINE += ' ';
var lineLength = LINE.length;

var xMax = fb.size().width;
var yMax = fb.size().height;

var draw = function() {
  var time = Date.now();
  var shift = (~~(time / INTERVAL) + index) % lineLength;

  fb.clear();

  fb.image(xMax - 70, yMax - 70, "resin-logo.png");
  fb.image(16, yMax - 70, "rpi-logo.png");

  fb.color(1, 1, 1);
  fb.font("fantasy", 320, true);
  fb.text(xMax / 2 - 10, yMax / 2, LINE[shift], true, 0);

  fb.font("fantasy", 12, false);
  fb.text(16, 10, (new Date()).toTimeString(), false, 0);

  fb.blit();
};

draw();
setInterval(draw, INTERVAL / 16);
