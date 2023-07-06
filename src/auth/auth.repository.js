const prisma = require("../db");
const jwt = require("jsonwebtoken");

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

const findUserByRefreshToken = async (refreshToken) => {
  const user = await prisma.user.findFirst({
    where: {
      refresh_token: refreshToken,
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

const signJwt = async (existingUser, res) => {
  const { id, name, role } = existingUser;

  const accessToken = jwt.sign(
    { id, name, role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  const refreshToken = jwt.sign(
    { id, name, role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      refresh_token: refreshToken,
    },
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
  });
  return accessToken;
};

module.exports = {
  findUserById,
  insertUser,
  findUserByUsername,
  signJwt,
  findUserByRefreshToken,
};
