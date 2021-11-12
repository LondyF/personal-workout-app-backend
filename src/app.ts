import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
    ctx.body = "Does this work?"
})

export default app;