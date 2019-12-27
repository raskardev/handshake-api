const KoaRouter = require('@koa/router');

const usersService = require('./service');

const router = new KoaRouter({
  prefix: '/users',
});

router.get('/', async (ctx) => {
  try {
    const users = await usersService.findAll();
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    ctx.status = error.status;
    ctx.body = error;
  }
});

router.post('/', async (ctx) => {
  try {
    const {
      request: { body },
    } = ctx;
    const createdUser = await usersService.create(body);
    ctx.status = 200;
    ctx.body = createdUser;
  } catch (error) {
    ctx.status = error.status;
    ctx.body = error;
  }
});

module.exports = router;
