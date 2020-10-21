const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const Test = require('../models/Test')
const auth = require('../middleware/auth.middleware')
const config = require('config')


router.post(
    '/createTest',
    auth,
    async (req, res) => {
        try {
            const newTest = new Test({
                test: req.body.test, owner: req.user.userId
            })
            await newTest.save()
            res.status(201).json({newTest})

        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    }
)

router.get(
    '/allTests',
    async (req, res) => {
        try {
            const allTests = await Test.find()
            res.json(allTests)

        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const test = await Test.findById(req.param.id)
            res.json(test)

        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так"})
        }
    }
)


module.exports = router