const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
const { JWT_SECRET, COOKIE_NAME } = require("../config");

module.exports = () => (req, res, next) => {
  //parse jwt
  if (parseToken(req, res)) {
    req.auth = {
      async register(username, password) {
        const token = await register(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      async login(username, password) {
        const token = await login(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      logout() {
        res.clearCookie(COOKIE_NAME);
      },
    };
    next();
  }
};

async function register(username, password) {
  //TODO adapt parameters to project requitrements
  //TODO extra validations
  const existing = await userService.getUserByUsername(username);
  if (existing) {
    throw new Error("Username is taken!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.createUser(username, hashedPassword);

  return generateToken(user);
}

async function login(username, password) {
  const user = await userService.getUserByUsername(username);
  if (!user) {
    const err = new Error("No such user");
    err.type = "credential";
    throw err;
  }
  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!hasMatch) {
    let err = new Error("Incorrect Password");
    err.type = "credential";
    throw err;
  }

  return generateToken(user);
}

function generateToken(userData) {
  return jwt.sign(
    {
      _id: userData._id,
      username: userData.username,
    },
    JWT_SECRET
  );
}

function parseToken(req, res) {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    try {
      const userData = jwt.verify(token, JWT_SECRET);

      req.user = userData;
      res.locals.user = userData; // !!! i can acces user from templates without passing it
    } catch (err) {
      res.clearCookie(COOKIE_NAME);
      console.log(err);
      res.redirect("/auth/login");

      return false;
    }
  }
  return true;
}
