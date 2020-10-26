const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const passport = require('passport');

const middlewarePassport = passport.authenticate('jwt', {session: false})

router.get(
    '/allUsers',
    middlewarePassport,
    async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        } catch (e) {
            res.status(500).json({message: e})
        }
    });

router.get('/user/:id',
    middlewarePassport,
    async (req, res) => {
        try {
            const user = await User.findById({_id: req.params.id});
            res.json(user)
        } catch (e) {
            res.status(500).json({message: e})
        }
    });

router.post('/addUser',
    middlewarePassport,
    async (req, res) => {
        try {
            const user = await new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                telegram: req.body.telegram,
                status: req.body.status,
            }).save()
            res.status(201).json(user)
        } catch (e) {
            res.status(500).json({message: e})
        }
    })

router.patch('/updateUser/:id',
    middlewarePassport,
    async (req, res) => {
        try {
            const updatedUser = await new User.findOneAndUpdate(
                {_id: req.params.id},
                {$set: req.body},
                {new: true}
            )
            res.status(200).json(updatedUser)
        } catch (e) {
            res.status(500).json({message: e})
        }
    })

router.delete('/deleteUser/:id',
    middlewarePassport,
    async (req, res) => {
        try {
            await User.findByIdAndDelete({_id: req.params.id})
            res.status(200).json({message: 'Ползователь был удален'})
        } catch (e) {
            res.status(500).json({message: e})
        }
    })

module.exports = router;