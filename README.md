# Open Virtual Tours
Free tool for the creation of custom virtual tours using Three.js through React Three Fiber.
## Features
## Project structure
## Installation
### Requirements
- VPS machine with a static IP
### Connect to VPS terminal
### (Optional) Generate SSL Certificate
1. Purchase a domain through a domain register and make sure it points to the IP of your VPS machine.
2. Install certbot.
```
$ sudo snap install --classic certbot
```
4. Generate certificate.
```
$ sudo certbot certonly --standalone
```
### Install Docker and Docker Compose
### Clone repo through Github Actions Runner
## Access the containers
### See your volume
```
$ sudo su
$ cd /var/lib/docker/volumes/open-virtual-tours_myvolume
```
### Container bash
```
$ sudo docker ps
$ sudo docker exec -it <container_id> bash
```
### View error logs
```
$ sudo docker ps
$ sudo docker logs <container_id>
```
