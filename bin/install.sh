#!/usr/bin/env sh


echo "Choose installation type:"
echo "  1. Using Docker"
echo "  2. Locally"
read -p "> " installation_type
echo ""


case "$installation_type" in
  "1")
    bin/install-docker.sh
    ;;

  "2")
    bin/install-local.sh
    ;;

  *)
    echo "Bad installation type"
    exit
    ;;
esac
