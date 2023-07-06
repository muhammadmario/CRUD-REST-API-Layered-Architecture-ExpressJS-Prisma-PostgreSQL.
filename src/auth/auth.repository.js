const prisma = require("../db");

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id: id } });
  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

const insertUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      username: userData.username,
      password: userData.password,
    },
  });
  return user;
};

module.exports = {
  findUserById,
  insertUser,
  findUserByUsername,
};
