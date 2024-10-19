const User = require('../models/User');

const bcrypt = require('bcryptjs');

async function register(req, res) {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    const tempaUser = { name, email, password: hashPassword };


    const user = await User.create(tempaUser);
    res.json({ msg: "user Reister", user })
}

async function login(req, res) {

    res.json({ msg: "user login" })
}


module.exports = { login, register };
