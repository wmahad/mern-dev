const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const User = require('mongoose').model('users');
const { loginValidator, regValidator } = require('../shared/validators');
const { passPort } = require('../shared/middlewares');

module.exports = (router) => {
    router.post('/auth/register', regValidator, async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ error: 'user already exists' });
        const avatar = await gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        user = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password,
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        res.json(user);
    });

    router.post('/auth/login', loginValidator, async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'user does not exists' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        res.json({ token: `Bearer ${user.generateAuthToken()}`, success: true });
    });

    router.get('/auth/me', passPort, async (req, res) => {
        res.json(req.user);
    })
}
