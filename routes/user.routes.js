const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const passport = require('passport');

router.get(
    '/allUsers',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        } catch (e) {
            res.status(500).json({message: e})
        }
    });

router.get('/user/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        try {
            const user = await User.findById({id: req.params.id});
            res.json(user)
        } catch (e) {
            res.status(500).json({message: e})
        }
    });

module.exports = router;