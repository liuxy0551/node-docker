# git clone https://gitee.com/jizhangla/jizhangla-api.git
git checkout .
git pull origin master
yarn
pm2 restart ./pm2/config.json --env production
pm2 monit
