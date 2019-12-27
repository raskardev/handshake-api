import test from 'ava';

const db = require('../db');

const usersService = require('../domain/users/service');

test.before(async () => {
  await db.connect();
});

test.after(async () => {
  await db.disconnect();
});

test.beforeEach(async () => {
  await db.users.deleteMany({
    where: {
      createdAt: {
        lte: new Date(),
      },
    },
  });
});

const fakeUser = {
  name: 'Test',
  email: 'test@test.com',
  password: 'test1234',
};

test('find all users', async (t) => {
  try {
    const users = await usersService.findAll();
    t.true(users.data.length === 0);
  } catch (error) {
    await db.disconnect();
  }
});

test('find one user', async (t) => {
  try {
    const createdUser = await usersService.create(fakeUser);
    const users = await usersService.findAll();
    t.true(users.data.length === 1);
    const foundUser = await usersService.findById(createdUser.id);
    t.true(foundUser.name === fakeUser.name);
  } catch (error) {
    await db.disconnect();
  }
});
