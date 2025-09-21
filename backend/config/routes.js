const admin = require("./admin");
const { admin: require_admin, log } = require("./admin2");

module.exports = (app) => {
  app.use(log);

  //* Auth
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  //* User
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .get(require_admin, app.api.user.get)
    .post(require_admin, app.api.user.save);
  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .get(require_admin, app.api.user.get)
    .put(require_admin, app.api.user.save)
    .delete(require_admin, app.api.user.remove);

  //* Category
  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(require_admin, app.api.category.get)
    .post(require_admin, app.api.category.save);
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);
  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(require_admin, app.api.category.save)
    .delete(require_admin, app.api.category.remove);

  //* Article
  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .get(require_admin, app.api.article.get)
    .post(require_admin, app.api.article.save);
  app
    .route("/articles/category/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);
  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(require_admin, app.api.article.save)
    .delete(require_admin, app.api.article.remove);
  // .delete(admin(app.api.article.remove));

  //* Stats
  app
    .route("/stats")
    .all(app.config.passport.authenticate())
    .get(app.api.stat.get);
};
