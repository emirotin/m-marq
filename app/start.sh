#!/bin/sh
udevd --daemon
udevadm trigger

if [ ! -c /dev/fb1 ]; then
  echo "loading piTFT kernel module"
  modprobe spi-bcm2708
  modprobe fbtft_device name=list; dmesg | tail -30
  modprobe fbtft_device name=adafruit22 verbose=1 rotate=270

  sleep 1

  mknod /dev/fb1 c $(cat /sys/class/graphics/fb1/dev | tr ':' ' ')
fi

node ./server.js
