# client-side app
server {
	listen 443;                                     #如果是https, 则替换80为443
	server_name profile.arknodejs.com;                #替换域名
	root /var/www/arkcms/profile/dist;       #替换路径为构建出来的dist路径
	set $node_port 8010;

	index index.js index.html index.htm;

	location / {
		try_files $uri $uri/ @rewrites;
	}

	location @rewrites {
		rewrite ^(.*)$ / last;
	}

	location ^~ /static/ {
		etag         on;
		expires      max;
	}
}