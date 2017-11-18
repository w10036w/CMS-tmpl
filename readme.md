# Arknodejs.com

Source of personal website [arknodejs.com](https://arknodejs.com), including 3 project templates (2 original), server configuration and scripts

个人网站源码 [arknodejs.com](https://arknodejs.com)，包括3个项目模板，简历模板复用，服务端nginx设置和makefile部署脚本

## Templates

- `/api`: CMS Backend, koa2-mongodb-restful with full swagger-ui documentation, partial mocha-chai test
- `/app`: CMS Frontend, using Vue SSR template, [readme](../app/readme.md)
- `/admin`: CMS admin portal, using Vue SPA template
- `/profile`: Non CMS, using Vue SPA template, personal profile template. Just create Json file of your profile and update all templates.
- `/conf`: nginx server configuration, automated deployment makefile

## Dependencies

- Install **Mongodb** (`brew install mongodb` for Mac) and create the empty folder under root `/`: `/data/db`
- **PM2** for production process managment and **nodemon** for hot reload API server `npm i pm2 nodemon -g`
- Create `prod.js` under `/api/conf/` to setup configuration in proudction.

## Start API (others refer to project's readme.md)

- Run MongoDb: `mongod` in terminal
- Start api: `npm run dev` in `/api` or `make dev-api` in project root.

## Online Demo

- [local API docs](http://localhost:8000/docs/api-yaml.html), [Online API docs](https://api.arknodejs.com/docs/api-yaml.html#/)
- [Main App](https://arknodejs.com/)
- [Admin Screenshot (yet)]
- [Profile](https://profile.arknodejs.com/)

## Todo List

- [ ] Docker
- [ ] Redis Support
- [ ] Other Comments Plugin
- [ ] Admin Dashboard
- [ ] Server push notification
- [ ] Add prebuild test for applications