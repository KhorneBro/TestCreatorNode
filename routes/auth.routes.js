const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

/* /api/auth */
router.post(
    '/register',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Минимальный разер пароля 3 символа').isLength({min: 3})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Не корректные данные при регистрации"
                })
            }
            const {email, password, name, telegram} = req.body
            const candidateForRegister = await User.findOne({email, name})

            if (candidateForRegister) {
                res.status(400).json({message: "Пользователь существует"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)

            const status = "USER"

            const user = new User({
                email, name, password: hashedPassword, telegram, status
            })

            await user.save()
            res.status(201).json({
                message: " Пользователь создан",
            })


        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так при регистрации"})
        }
    })

router.post(
    '/login',
    [
        check('email', 'введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальный разер пароля 3 символа').isLength({min: 3}).exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Не корректные данные при входе"
                })
            }

            const {email, password, status} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatchPas = await bcrypt.compare(password, user.password)
            if (!isMatchPas) {
                return res.status(400).json({message: "Не корректный пароль"})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id, userStatus: user.status})

        } catch (e) {
            res.status(500).json({message: "что-то пошло не так"})
        }
    })
module.exports = router