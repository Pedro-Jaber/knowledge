const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Informe usuário e senha!");
    }

    const user = await app.db("users").where({ email }).first();

    if (!user) return res.status(401).send("Usuário/senha invalidos");

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).send("Usuário/senha invalidos");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, process.env.AUTHSECRET),
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;
    try {
      if (userData) {
        const token = jwt.decode(userData.token, process.env.AUTHSECRET);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (err) {}

    res.send(false);
  };

  return { signin, validateToken };
};
