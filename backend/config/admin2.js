module.exports.admin = (req, res, next) => {
  const user = req.user;

  if (user.admin) {
    next();
  } else {
    res.status(403).send("Usuário não autorizado");
  }
};
