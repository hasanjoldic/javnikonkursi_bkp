### Arhiva svih konkursa za zapošljavanje u javnim ustanovama i preduzećima u Bosni i Hercegovini

# Javni konkursi

To se how to set up a VPN server, see `VPN.md`.

## 1. Provision server

### 1.1. Create a sudo user

```
  # non-interactivly create user
  adduser --disabled-password --gecos "" <USERNAME>
  # add to sudo group
  usermod -aG sudo <USERNAME>
  # don't require password
  passwd -d <USERNAME>
  su <USERNAME>
```

### 1.2. Install node (as sudo user)

[Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

```
  sudo apt update
  cd ~
  curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
  sudo bash nodesource_setup.sh
  sudo apt install nodejs -y
  sudo npm install -g yarn
  rm -rf ~/nodesource_setup.sh
```

### 1.3. Install nginx

[Tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)

```
  sudo apt-get install nginx -y
```

```
  sudo vi /etc/nginx/sites-available/default
```

```
server {
  # server_name javnikonkursi.com www.javnikonkursi.com;
  server_name <SERVER_HOST>;

  root /usr/share/nginx/html;

  location /graphql {
    proxy_pass http://localhost:3000/graphql;
  }

  location /api/v1/ {
    proxy_pass http://localhost:3000;
  }

  location / {
    # server static files in production
    try_files $uri $uri/ /index.html;
    # proxy to dev server in development
    proxy_pass http://localhost:8080;
  }
}
```

To be able to upload larger files, add a line in the http section:

```
  sudo vi /etc/nginx/nginx.conf
```

```
http {
  client_max_body_size 100M;
}
```

```
  sudo systemctl restart nginx
```

### 1.4. Enable HTTPS

[Tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

```
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d <DOMAIN>.com -d www.<DOMAIN>.com
sudo systemctl status certbot.timer
```

### 1.5. Install pm2

[Tutorial](https://www.digitalocean.com/community/tutorials/nodejs-pm2)

```
sudo npm install -g pm2
pm2 startup
# [PM2] You have to run this command as root. Execute the following command:
#       sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v14.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

### 1.6. Set up the database

[How to install postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)

If needed, purge previous installations first:

```
sudo apt-get --purge remove postgresql postgresql-*
```

```
sudo apt install postgresql postgresql-contrib -y

sudo -i -u postgres

psql -U postgres -c "CREATE DATABASE javnikonkursi"
psql -U postgres -d javnikonkursi -c "CREATE ROLE default_superuser LOGIN SUPERUSER PASSWORD '5dee1e23e7f975faae7027db47972d3a27927790fcdc68d51bc51ead4cf6aa38';"
```

### 1.6.1. (DEV ONLY) Allow remote access to postgres db

```
# append to /etc/postgresql/<VERSION>/main/postgresql.conf
listen_addresses = '*'
```

```
# append to /etc/postgresql/<VERSION>/main/pg_hba.conf
host all all 0.0.0.0/0 md5
```

```
# restart DBMS
sudo invoke-rc.d postgresql restart
```

### 1.7. Clone project

```
cd ~ && git clone git@github.com:HasanJoldic/javnikonkursi.git
```

### 1.7. Set up environment variables

```
# <PROJECT_ROOT>/services/backend/.env
NODE_ENV=<development|production>

POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

JWT_SECRET=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_PUBLIC_URL=
```

```
# <PROJECT_ROOT>/services/frontend/.env
NODE_ENV=<development|production>

API_FULL_PATH=
GRAPHQL_FULL_PATH=

```

### 1.7. Migrate database

```
cd <PROJECT_ROOT>/services/backend
# don't use --frozen-lockfile on local machine to get the latest package versions
yarn install --frozen-lockfile
node db/migrate.js
```

## 2. Run app

### 2.1. Install dependencies and build project

```
cd <PROJECT_ROOT>/services/backend
yarn install --frozen-lockfile
# prod
yarn workspaces run build
# dev
yarn workspace @javnikonkursi/shared run build && yarn workspace @javnikonkursi/backend run build
```

### 2.2. Serve frontend with nginx

```
# prod
sudo cp -r <PROJECT_ROOT>/services/frontend/build/* /usr/share/nginx/html/
```

```
# dev
co <PROJECT_ROOT>/services/frontend/
pm2 delete frontend
pm2 start --name frontend npm -- start
pm2 save
```

### 2.3. Run backend as a service with pm2

```
cd <PROJECT_ROOT>/services/backend
pm2 delete api
pm2 start --name api dist/index.js
pm2 save
```

# 3. Firewall settings

## 3.1. Development

| Source | Protocol | Port | Description |
| :----- | :------: | ---: | ----------: |
| VPN    |   TCP    |   22 |         SSH |
| VPN    |   TCP    |   80 |        HTTP |
| VPN    |   TCP    |  443 |       HTTPS |
| VPN    |   TCP    | 5432 |    postgres |

## 3.2. Production

| Source             | Protocol | Port | Description |
| :----------------- | :------: | ---: | ----------: |
| VPN                |   TCP    |   22 |         SSH |
| Any IPv4, Any IPv6 |   TCP    |   80 |        HTTP |
| Any IPv4, Any IPv6 |   TCP    |  443 |       HTTPS |
