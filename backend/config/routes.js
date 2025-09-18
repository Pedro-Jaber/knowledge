module.exports = (app) => {
  //* Auth
  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);

  //* User
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .get(app.api.user.get)
    .post(app.api.user.save);
  app.route("/users/:id").get(app.api.user.get).put(app.api.user.save);

  //* Category
  app
    .route("/categories")
    .all(app.config.passport.authenticate())
    .get(app.api.category.get)
    .post(app.api.category.save);
  app
    .route("/categories/tree")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getTree);
  app
    .route("/categories/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove);

  //* Article
  app
    .route("/articles")
    .all(app.config.passport.authenticate())
    .get(app.api.article.get)
    .post(app.api.article.save);
  app
    .route("/articles/category/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getByCategory);
  app
    .route("/articles/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.article.getById)
    .put(app.api.article.save)
    .delete(app.api.article.remove);
};
