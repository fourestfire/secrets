const Sequelize = require('sequelize');

const db = new Sequelize(
  'postgres://localhost:5432/secrets'
);

const SecretModel = db.define('secret', {
  text: {
      type: Sequelize.TEXT,
      allowNull: false
  }
});

const CommentModel = db.define('comment', {
  text: {
      type: Sequelize.TEXT
  }
});

CommentModel.belongsTo(SecretModel, { as: 'secret'})
SecretModel.hasMany(CommentModel, {as: 'comments'})

module.exports = {
    Secret: SecretModel,
    Comment: CommentModel
};
