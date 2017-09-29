## for Mac

# setup vars
PATH_NGINX = /usr/local/etc/nginx
PATH_WWW = /usr/local/var/www

ENV = com
DOMAIN = arknodejs.$(ENV)

COLORS:=$(shell tput colors 2> /dev/null)
ifeq ($(COLORS), 256)
    C_RESET=\033[0;39;49m
    C_GREEN=\033[38;5;118m
    C_BLUE=\033[38;5;81m
    C_RED=\033[38;5;161m
    C_PURPLE=\033[38;5;135m
    C_ORANGE=\033[38;5;208m
    C_YELLOW=\033[38;5;227m
    C_GREY=\033[38;5;245m
    C_WHITE=\033[38;5;15m
else ifeq ($(COLORS), 16)
    C_RESET=\033[0;39;49m
    C_GREEN=\033[0;32m
    C_BLUE=\033[0;34m
    C_RED=\033[0;31m
    C_PURPLE=\033[0;35m
    C_ORANGE=\033[1;31m
    C_YELLOW=\033[0;33m
    C_GREY=\033[1;30m
    C_WHITE=\033[1;37m
endif

hello:
	@echo "hello $(DOMAIN)"
# profile:
# @cp -b /var/www/arknodejs/config/profile.arknodejs.com /etc/nginx/sites-available
# @ln -s /etc/nginx/sites-available/profile.arknodejs.com /etc/nginx/sites-enabled/profile.arknodejs.com

all: prep service clean install service-start start

prep: prep-nginx prep-certbot prep-mongo prep-redis prep-nodejs prep-pm2

prep-nginx:
ifeq (, $(shell which nginx))
	@echo "$(C_BLUE)nginx installing...$(C_RESET)"
	@apt-get update
	@apt-get install nginx
endif
	@echo "$(C_GREEN)nginx installed$(C_RESET)"
	@cp ${PATH_WWW}/$(DOMAIN)/conf/$(DOMAIN) ${PATH_NGINX}/sites/${DOMAIN}
	@echo "$(C_GREEN)nginx configured$(C_RESET)"

prep-certbot:
ifeq (, $(shell which certbot))
	@echo "$(C_BLUE)certbot installing...$(C_RESET)"
	@brew update && brew install certbot
endif
	@echo "$(C_GREEN)certbot installed$(C_RESET)"
	@sudo certbot certonly --standalone -d $(DOMAIN)
	@echo "$(C_GREEN)certbot certificate generated$(C_RESET)"
	
prep-mongo:
ifeq (, $(shell which mongod))
	@echo "$(C_BLUE)mongodb installing...$(C_RESET)"
	@apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	@echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	@apt-get update && apt-get install -y mongodb-org
endif
	@echo "$(C_GREEN)mongodb installed$(C_RESET)"

prep-redis:
# REDIS := $(shell redis-server)
ifeq (, $(shell which redis-server))
	@echo "$(C_BLUE)redis installing...$(C_RESET)"
	@apt-get install redis-server
endif 
	@echo "$(C_GREEN)redis installed$(C_RESET)"

prep-nodejs:
ifeq (, $(shell which node))
	@echo "$(C_BLUE)nodejs installing...$(C_RESET)"
	@curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
	@apt-get install -y nodejs
endif
	@echo "$(C_GREEN)nodejs installed$(C_RESET)"

prep-pm2:
ifeq (, $(shell which pm2))
	@echo "$(C_GREEN)pm2 installing...$(C_RESET)"
	@npm i -g pm2
endif
	@echo "$(C_GREEN)pm2 installed$(C_RESET)"

conf-redis:
	@nano /etc/redis/redis.conf
#add:
# maxmemory 128mb
# maxmemory-policy allkeys-lru
service-start:
	@service mongod start
	@nginx
	@systemctl restart redis-server.service
	@systemctl enable redis-server.service
service-end:
	@service mongod stop
	@nginx -s stop

test-nginx: 
	@echo "<-- nginx test start -->"
	@nginx -t
	@echo "<--  nginx test end  -->"

clean:
	@rm -rf admin/node_modules
	@rm -rf api/node_modules
	@rm -rf front/node_modules
	@echo	"node_modules clean complete"

install:
	@cd api && npm i --only=production
	@cd ..
	@cd front && npm i --only=production
	@cd ..
	@echo	"npm install production complete"

start: start-api start-admin start-app 
start-admin:
	@echo "start admin"
	@cd admin && pm2 start pm2-prod.json
	@cd ..
start-api:
	@echo "start api"
	@cd api && pm2 start pm2-prod.json
	@cd ..
start-app:
	@echo "start app"
	@cd app && pm2 start process.json
	@cd ..

dev: dev-api dev-admin dev-app
dev-api:
	@echo "dev api"
	@cd api && pm2 start pm2-dev.json
	@cd ..
dev-app:
	@echo "dev app"
	@cd front && pm2 start process.json --env development
	@cd ..
dev-admin:
	@echo "dev admin"
	@cd admin && pm2 start pm2-dev.json
	@cd ..

end:
	@pm2 stop api admin app

kill:
	@pm2 kill

restart:
	@pm2 restart api admin front

version:
	@nginx -v
	@echo "node" && node -v
	@echo "npm" && npm -v
