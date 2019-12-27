const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();

app.use(bodyParser());
app.use(cors());

const usersRouter = require('./domain/users/router');

app.use(usersRouter.routes()).use(usersRouter.allowedMethods());

const db = require('./db');

db.connect()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => console.log('Server started'));
  })
  .catch((err) => console.error(err));
