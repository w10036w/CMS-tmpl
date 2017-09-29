# Arkcms-api
> A production-ready node.js CMS skeleton built on koa2, mongodb, redis

## Basic Features
### Design
- [x] Restful
- [ ] Graphql

### LOG
- [x] log4js
- [ ] winston

### Routing
- [ ] CORS dynamic list

### Database
- [x] Mongodb
- [ ] MySql

### Cache: Redis

### CDN
- [x] [qiniu](https://www.qiniu.com/) as image CDN
- [ ] Akamai as cache CDN

### Continous Integration
- [x] Makefile automation
- [ ] Docker
- [x] Nginx configuration
- [ ] Hook or Jenkins
- [ ] Docker

### Maintenance
- [x] PM2 management
- [ ] Keymetrics maintenance

### Documentation
- [x] Swagger json / yaml (serve as static files)
- [x] ~~[Swagger-jsdoc](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.Wb68GNOg9TY) based on [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)~~
- [x] ~~Cancel Apiary: not simple and fast~~
- [x] ~~[apidocjs](http://apidocjs.com/): [official example](http://apidocjs.com/example/)~~
  - Pros: well structured UI, doc writing
  - Cons: no sending request support as swagger or integration with unit test

### Test
- [x] Unit test with Mocha, Chai, Istanbul & Mochawesome
- [ ] Integration test
- [ ] E2E
- [ ] Integrate with documentation

### Code Quality
- [ ] [SonarJs](https://www.sonarsource.com/products/codeanalyzers/sonarjs.html)


### SEO
- [ ] Sitemap
- [ ]

## Advanced Features
### Comments
- [ ] Local comments (in Application Logic)
- [ ] Discuz
- [ ] Facebook comments

### PWA

### Service-worker

### STATICIZE
- [ ] Typescript

## Xhink
Thinking of generator for Model - ORM - API (admin, simple client) - DOC - UnitTest