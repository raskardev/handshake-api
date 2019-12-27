const { encryptPassword } = require('../../utils/auth');

const { createValidation, updateValidation } = require('./validations');

const Users = require('../../db').users;

const findAll = async () => {
  try {
    const users = await Users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    return {
      data: users,
    };
  } catch (error) {
    const err = {
      status: 500,
      code: 'users.findAll',
      message: error,
    };
    throw err;
  }
};

const findById = async (id) => {
  try {
    const user = await Users.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      const err = {
        status: 404,
        code: 'users.findById',
        message: 'No user with that id',
      };
      throw err;
    }
    return user;
  } catch (error) {
    if (error.code) {
      throw error;
    }
    const err = {
      code: 'users.findById',
      message: error,
    };
    throw err;
  }
};

const create = async (data) => {
  try {
    const userToBeCreated = { ...data };
    const validation = createValidation(userToBeCreated);

    if (validation.error) {
      const err = {
        status: 500,
        code: 'users.create',
        message: validation.error,
      };
      throw err;
    }
    const encryptedPassword = await encryptPassword(userToBeCreated.password);
    userToBeCreated.password = encryptedPassword;

    const createdUser = await Users.create({
      data: userToBeCreated,
      select: {
        id: true,
      },
    });

    return createdUser;
  } catch (error) {
    if (error.code) {
      throw error;
    }
    const err = {
      status: 500,
      code: 'users.create',
      message: error,
    };
    throw err;
  }
};

const update = async ({ id, data }) => {
  try {
    const userToBeUpdated = { ...data };
    const validation = updateValidation(userToBeUpdated);

    if (validation.error) {
      const err = {
        status: 500,
        code: 'users.update',
        message: validation.error,
      };
      throw err;
    }

    userToBeUpdated.updatedAt = new Date().toISOString();

    const updatedUser = await Users.update({
      where: { id },
      data: userToBeUpdated,
      select: {
        id: true,
      },
    });

    return updatedUser;
  } catch (error) {
    const err = {
      status: 500,
      code: 'users.update',
      message: error,
    };
    throw err;
  }
};

const remove = async (id) => {
  try {
    const deletedUser = await Users.delete({ where: { id } });
    return deletedUser;
  } catch (error) {
    const err = {
      status: 500,
      code: 'users.remove',
      message: error,
    };
    throw err;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
