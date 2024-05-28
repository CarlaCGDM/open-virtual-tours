# Open Virtual Tours
Free tool for the creation of custom virtual tours using Three.js through React Three Fiber.
## 1. Features
## 2. Installation
You can quickly get your own version of the web tour running by following these simple steps.
### 2.1. Requirements
- VPS machine with a static public IP address, access to the terminal, and at least 2GB of RAM.
- SSL certificate (for testing purposes, you can generate a self-signed certificate with `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365` on your local machine).
- Public DNS address pointing to your public IP address (normally free with most cloud computing platorm instances).
### 2.2. Connect to VPS terminal
### 2.3. Install Docker and Docker Compose
You will need Docker and Docker Compose to be able to run the containers that contain the application. 
### 2.4. Create a copy of this repo
Fork this repo or clone it and import it to your GitHub account. 
### 2.5. Fill in your data
 - Include your public DNS address where needed.
 - Include your public IP address where needed.
 - Include the name of your organization, the name of your tour, description, etc. (React .env file).
 - Include your cert.pem and key.pem certificates (frontend/certs folder).
### 2.5. Clone the repo on your VPS through Github Actions Runner
Go to settings -> actions -> runners and create a new runner. Follow the instructions. Additionally, to make the runner persist:
```
sudo ./svc.sh install
sudo ./svc.sh start
```
## 3. Access the containers
Everything should be up and running now. If you have any issues, you can see the data stored in your volume and the error logs of your containers through the following Docker commands.
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
