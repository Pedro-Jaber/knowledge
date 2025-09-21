module.exports.admin = (req, res, next) => {
  const user = req.user;

  if (user.admin) {
    next();
  } else {
    res.status(403).send("Usuário não autorizado");
  }
};

module.exports.log = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  // console.log("req:", req);
  next();
};
