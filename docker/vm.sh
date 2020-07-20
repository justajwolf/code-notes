#!/bin/bash 
docker-machine ssh
sudo sysctl -w vm.max_map_count=262144
exit