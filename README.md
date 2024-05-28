# Open Virtual Tours
Free tool for the creation of fully customizable 3D virtual tours using Three.js through React Three Fiber.
## 1. Features
## 2. Installation
### 2.1. Check your requirements
- Ubuntu VPS with a static public IP address, access to the terminal and at least 2GB of RAM.
- SSL certificate (for testing purposes, you can generate a self-signed certificate with `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365` on your local machine).
### 2.3. Install Docker and Docker Compose
In your VPS machine, you will need to install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/linux/#install-using-the-repository) to be able to run the containers that hold the application. Check that Docker and Docker Compose are installed correctly through `sudo docker --version` and `sudo docker compose version`.

### 2.4. Fork this repo
[Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) this repository as yourself or your organization.
### 2.5. Fill in your data
 - Include your public DNS address where needed.
 - Include your public IP address where needed.
 - Include the name of your organization, the name of your tour, description, etc. (React .env file).
 - Include your cert.pem and key.pem certificates (frontend/certs folder).
### 2.5. Clone the repo on your VPS through Github Actions Runner
Go to settings -> actions -> runners and create a new runner and follow the instructions. Additionally, to make the runner persist:
```bash
$ sudo ./svc.sh install
$ sudo ./svc.sh start
```
## 3. Troubleshooting
Everything should be up and running now. If you have any issues, you can see the data stored in your volume and the error logs of your containers through the following Docker commands.
### 3.1. See your volume
```bash
$ sudo su
$ cd /var/lib/docker/volumes/open-virtual-tours_myvolume
```
### 3.2. Container bash
```bash
$ sudo docker ps
$ sudo docker exec -it <container_id> bash
```
### 3.3. View error logs
```bash
$ sudo docker ps
$ sudo docker logs <container_id>
```
