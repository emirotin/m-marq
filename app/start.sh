#!/bin/sh
udevd --daemon
udevadm trigger

# Sync the clock once
ntpdate pool.ntp.org

# Start background ntp syncing every 1min
while true; do
	sleep 60
	ntpdate pool.ntp.org
done &

if [ ! -c /dev/fb1 ]; then
  echo "loading piTFT kernel module"
  modprobe spi-bcm2708
  modprobe fbtft_device name=pitft verbose=0 rotate=180

  sleep 1

  mknod /dev/fb1 c $(cat /sys/class/graphics/fb1/dev | tr ':' ' ')
fi

node ./server.js
