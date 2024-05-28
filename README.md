# Open Virtual Tours
Free tool for the creation of custom virtual tours using Three.js through React Three Fiber.
## 1. Features
## 2. Installation
Here is how you can have your own version of the tour deployed to the web.
### 2.1. Requirements
- VPS machine with a static IP and access to the terminal.
- SSL certificate (for testing purposes, you can generate a self-signed certificate with `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365`.)
### 2.2. Connect to VPS terminal
### 2.3. Install Docker and Docker Compose
### 2.4. Fork this repo and fill in your data
### 2.5. Clone it through Github Actions Runner
## 3. Access the containers
### 3.1. See your volume
```
sudo su
cd /var/lib/docker/volumes/open-virtual-tours_myvolume
```
### 3.2. Container bash
```
sudo docker ps
sudo docker exec -it <container_id> bash
```
### 3.3. View error logs
```
sudo docker ps
sudo docker logs <container_id>
```
