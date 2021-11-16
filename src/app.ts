import Koa from "koa";

import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

import { workoutRouter } from "routes";

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.statusCode || 500;
    ctx.body = {
      message: e.message || "Something went wrong",
    };
  }
});

app.use(workoutRouter.routes());

export default app;
