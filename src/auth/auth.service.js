const prisma = require("../db");
const bcrypt = require("bcrypt");
const {
  findUserById,
  insertUser,
  findUserByUsername,
} = require("./auth.repository");
prisma;

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw Error("user not found");
  }
  return user;
};

const createUser = async (newUserData) => {
  const { name, username, password } = newUserData;
  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    throw Error("username already use");
  }

  const hashedPassword = bcrypt.hashSync(password, 5);
  const userData = {
    name,
    username,
    password: hashedPassword,
  };
  const user = await insertUser(userData);
  return user;
};

const loginUser = async (userData) => {
  const { username, password } = userData;
  const existingUser = await findUserByUsername(username);

  if (!existingUser) {
    throw Error("username not found");
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    throw Error("wrong password");
  }

  return existingUser;
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
};
