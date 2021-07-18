// Repository
const UserRepository = require('../../repositories/user-repository');
const Users = new UserRepository();

// AUTHGUARD
const authGuard = (permissions) => {
    return async (req, res, next) => {

        // Get token from headers
        let api_token = req.headers['auracle_key'];

        // Uses repo to validate the associated perms with the token
        Users.checkAPITokenPerms(api_token, permissions)
            .then(() => {
                next();
            })
            .catch(err => {
                res.status(err.code).send(JSON.stringify(err));
            });
    };
};

module.exports = authGuard;