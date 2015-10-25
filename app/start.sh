#!/bin/sh
udevd --daemon
udevadm trigger

if [ ! -c /dev/fb1 ]; then
  #echo "loading piTFT kernel module"
  #modprobe spi-bcm2708
  echo "111"
  modprobe fbtft_device name=adafruitrt35 verbose=1 rotate=270 frequency=32000000

  sleep 1

  mknod /dev/fb1 c $(cat /sys/class/graphics/fb1/dev | tr ':' ' ')
fi

node ./server.js
