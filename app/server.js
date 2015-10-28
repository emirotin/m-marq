var pitft = require("pitft");

var fb = pitft("/dev/fb1", true); // Returns a framebuffer in double buffering mode
console.log("starting node.js script...")

// Clear the back buffer
fb.clear();

console.log('size', fb.size());
var xMax = fb.size().width;
var yMax = fb.size().height;

var draw = function() {
  fb.color(1, 1, 1);
  fb.font("fantasy", 320, true);
  fb.text(xMax / 2 - 30, yMax / 2, "M", true, 0);
  fb.blit();
};

draw();
setInterval(function() {
  draw();
}, 100);
