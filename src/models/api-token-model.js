const bookshelf = require('../database/bookshelf').bookshelf;

require('./user-model');

let APIToken = bookshelf.Model.extend({
    tableName: 'api_token',
    hidden: ['id'],
    user() {
        return this.belongsTo('User', 'user_uuid', 'uuid');
    }
});

module.exports = bookshelf.model('APIToken', APIToken);