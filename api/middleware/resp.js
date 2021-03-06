async function logger(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // ctx.set('X-Response-Time', `${ms}ms`) // if needed
  log.info(`[${ctx.method}] ${decodeURIComponent(ctx.url)} : ${ms}ms`);
}

module.exports = { logger }