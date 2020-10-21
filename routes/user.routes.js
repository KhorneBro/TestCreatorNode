const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const Test = require('../models/Test')
const auth = require('../middleware/auth.middleware')
const config = require('config')

router.get(
    '/allUsers',
    auth,
    async (req, res) => {
        try {
            const allUsers = await User.findOne({name: 'vdl255'})
            console.log('allUsers')
            res.json(allUsers)
        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

module.exports = router