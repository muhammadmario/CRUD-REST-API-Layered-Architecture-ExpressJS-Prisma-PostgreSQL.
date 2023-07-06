const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  findUserById,
  insertUser,
  findUserByUsername,
  signJwt,
  findUserByRefreshToken,
} = require("./auth.repository");

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw Error("user not found");
  }
  return user;
};

const createUser = async (newUserData) => {
  const { name, username, password, role } = newUserData;
  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    throw Error("username already use");
  }

  const hashedPassword = bcrypt.hashSync(password, 5);

  const userData = {
    name,
    username,
    role: "User",
    password: hashedPassword,
  };
  const user = await insertUser(userData);
  return user;
};

const loginUser = async (userData, res) => {
  const { username, password } = userData;
  if (!username || !password) {
    throw Error("Username and Password are required.");
  }
  const existingUser = await findUserByUsername(username);

  if (!existingUser) {
    throw Error("username not found");
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    throw Error("wrong password");
  }

  const loginUserJwt = signJwt(existingUser, res);

  return loginUserJwt;
};

const refreshToken = async (getRefreshToken, res) => {
  const newAccessToken = "kontol";
  if (!getRefreshToken) {
    throw new Error("cookie not found");
  }
  const getUser = await findUserByRefreshToken(getRefreshToken);
  if (!getUser) {
    throw new Error("refresh token not match with any user");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      getRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          reject(new Error("failed"));
        }
        const { id, name, role } = getUser;
        const accessToken = jwt.sign(
          { id, name, role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        console.log(accessToken);
        resolve(accessToken);
      }
    );
  });
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
  refreshToken,
};
