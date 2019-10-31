const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        const { email, password, username } = req.body;
        const db = req.app.get('db');
        const foundUser = await db.find_user_by_email(email)
        if(foundUser.length) {
            res.status(400).send('user already exists')
        } else {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const { newUser } = await db.create_user([email, hashedPassword, username]);
            // req.session.user = newUser[0]
            req.session.user = newUser
            res.status(200).send(req.session.user)
        }
    },
    login: (req, res, next) => {},
    logout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send("Hope you enjoy your new purchase!")
    },
    userSession: (req, res, next) => {
        res.status(200).send(req.session.user)
    },
}