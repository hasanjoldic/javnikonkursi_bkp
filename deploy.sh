cd /home/$USER/konkursi-backend
yarn install --frozen-lockfile
yarn workspaces run build:dev
sudo cp -r /home/$USER/javnikonkursi/services/frontend/build/* /usr/share/nginx/html/
pm2 delete api 2> /dev/null
cd /home/$USER/javnikonkursi/services/backend
pm2 start --name api dist/index.js
pm2 save