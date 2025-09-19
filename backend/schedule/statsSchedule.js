const schedule = require("node-schedule");

module.exports = (app) => {
  schedule.scheduleJob("*/1 * * * *", async function () {
    console.log("[Stats] Atualizando estatisticas...");
    const usersCount = await app.db("users").count("id").first();
    const categoriesCount = await app.db("categories").count("id").first();
    const articlesCount = await app.db("articles").count("id").first();

    const { Stat } = app.api.stat;

    const lastStat = await Stat.findOne({}, {}, { sort: { createdAt: -1 } });

    const stat = new Stat({
      users: usersCount.count,
      categories: categoriesCount.count,
      articles: articlesCount.count,
    });

    const changeUsers = !lastStat || lastStat.users !== stat.users;
    const changeCategories =
      !lastStat || lastStat.categories !== stat.categories;
    const changeArticles = !lastStat || lastStat.articles !== stat.articles;

    if (changeUsers || changeCategories || changeArticles) {
      stat
        .save()
        .then((stat) =>
          console.log(
            `[Stats] Estatisticas atualizadas: {users: ${stat.users}, categories: ${stat.categories}, articles: ${stat.articles}}`
          )
        );
    } else {
      console.log("[Stats] Estatisticas já atualizadas");
    }
  });
};
