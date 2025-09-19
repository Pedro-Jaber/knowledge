module.exports = (app) => {
  const StatSchema = new app.mongoose.Schema(
    {
      users: { type: Number, required: true },
      categories: { type: Number, required: true },
      articles: { type: Number, required: true },
    },
    { timestamps: true }
  );

  const Stat = app.mongoose.model("Stat", StatSchema);

  const get = (req, res) => {
    Stat.findOne({}, {}, { sort: { createdAt: -1 } }).then((stat) => {
      const defaultStat = { users: 0, categories: 0, articles: 0 };
      res.json(stat || defaultStat);
    });
  };

  return { Stat, get };
};
