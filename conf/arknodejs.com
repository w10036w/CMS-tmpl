# api
server {
  listen         80;
  server_name    api.arknodejs.com;
  return         301 https://$server_name$request_uri;
}
server {
  charset utf-8;
  listen       443 ssl http2;
  server_name  api.arknodejs.com;

  ssl                   on;
  ssl_certificate /etc/letsencrypt/live/arknodejs.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/arknodejs.com/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header    X-Forwarded-Proto-Version $http2;
    proxy_set_header    Upgrade                   $http_upgrade;
    proxy_set_header    Connection                'upgrade';
    proxy_set_header    Host                      $host;
    proxy_cache_bypass  $http_upgrade;
    proxy_redirect off;
    #proxy_set_header   X-Real-IP                 $remote_addr;
    proxy_set_header    X-Forwarded-For           $proxy_add_x_forwarded_for;
    #proxy_set_header   X-NginX-Proxy             true;
  }
  
  location ~ /\.(ht|svn|git|idea|vscode){
    deny all;
  }
}

# admin
server {
  listen         80;
  server_name    admin.arknodejs.com;
  return         301 https://$server_name$request_uri;
}
server {
  charset utf-8;
  listen       443 ssl http2;
  server_name  admin.arknodejs.com;
  index index.html index.php;
  root /usr/local/var/www/arknodejs.com/admin/dist;

  ssl                   on;
  ssl_certificate /etc/letsencrypt/live/arknodejs.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/arknodejs.com/privkey.pem;
  
  location ^~ /api/ {
    rewrite ^/api/(.*) /$1 break;
    proxy_set_header Connection "upgrade";
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header   Host $host;
    proxy_redirect off;
  }

  location ^~ /static/ {
    etag         on;
    expires      max;
  }
  location ~ /\.(ht|svn|git|idea|vscode){
    deny all;
  }
}


# app - main vue-ssr
server {
  listen         80;
  server_name    arknodejs.com www.arknodejs.com;
  return         301 https://$server_name$request_uri;
}

proxy_cache_path /etc/nginx/tmp levels=1:2 keys_zone=arknodejs:10m inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";

server {
  server_name  arknodejs.com www.arknodejs.com;
  charset utf-8;
  listen       443 ssl http2 fastopen=3 reuseport;
  ssl                   on;
  ssl_certificate /etc/letsencrypt/live/arknodejs.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/arknodejs.com/privkey.pem;
  #add_header Strict-Transport-Security max-age=63072000;
  #add_header X-Frame-Options DENY;
  #add_header X-Content-Type-Options nosniff;

  # main site
  location / {
    proxy_pass http://127.0.0.1:8002;
    proxy_set_header    X-Forwarded-Proto-Version $http2;
    proxy_set_header    Upgrade                   $http_upgrade;
    proxy_set_header    Connection                'upgrade';
    proxy_set_header    Host                      $host;
    proxy_cache_bypass  $http_upgrade;
    proxy_redirect off;
    #proxy_set_header   X-Real-IP                 $remote_addr;
    proxy_set_header    X-Forwarded-For           $proxy_add_x_forwarded_for;
    #proxy_set_header   X-NginX-Proxy             true;
    #add_header          X-Proxy-Cache             $upstream_cache_status;
    #proxy_cache         my_zone;
    #include            proxy_params;
  }
  #if only one domain
  location /api {
    proxy_pass http://127.0.0.1:8000;
  }
  
  location /admin {
    rewrite ^/admin(.*) /$1 break;
    proxy_pass http://127.0.0.1:8003;
  }

  #_location /ws {
  #_  proxy_pass http://127.0.0.1:8001;
  #_  proxy_http_version 1.1;
  #_  proxy_set_header Upgrade $http_upgrade;
  #_ proxy_set_header Connection "upgrade";
  #_}

  location ~ /\.(ht|svn|git|idea|vscode){
    deny all;
  }
  # Feed
  location ~* \.(?:rss|atom)$ {
    expires 1h;
    add_header Cache-Control "public";
  }

  # CSS and Javascript
  location ~* \.(jpg|jpeg|gif|css|png|js|ico)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
  }
}
