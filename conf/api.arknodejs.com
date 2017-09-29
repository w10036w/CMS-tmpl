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
