#konkursi-backend

create a sudo user
https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04

npm run migrate:latest

CREATE EXTENSION "uuid-ossp";

The easiest way is to run node's crypto hash in your terminal:

node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

---

13.01.2022

## 1. Provision the server

### 1.1. Install node

```
  apt-get update
  apt-get install nodejs
  apt-get install npm
  npm install -g yarn
```

## 2. Install dependencies and build projects

```
  cd <project-root-dir> && yarn install
  cd <frontend-root-dir> && yarn buildcd
```

## 3. Install docker and docker-compose

https://docs.docker.com/engine/install/ubuntu/

https://docs.docker.com/compose/install/

set up the repository:

```
  apt-get install ca-certificates curl gnupg lsb-release
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

install docker:

```
  apt-get update
  apt-get install docker-ce docker-ce-cli containerd.io
```

set up the repository:

```
  curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

apply executable permissions to the binary:

```
  chmod +x /usr/local/bin/docker-compose
```
