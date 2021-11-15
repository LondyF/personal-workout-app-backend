import Koa from "koa";

import logger from "koa-logger";
import bodyParser from "koa-bodyparser";

import { workoutRouter } from "routes";

const app = new Koa();

app.use(logger());
app.use(bodyParser());

app.use(workoutRouter.routes());

export default app;
