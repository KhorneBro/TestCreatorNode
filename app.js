const express = require('express');
const config = require('config')
const mongoose = require('mongoose');
const passport = require('passport')

const PORT = config.get('port') || 3000
const app = express();

mongoose.set('debug', true)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/test', require('./routes/test.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use(passport.initialize())
require('./middleware/passport.middleware')(passport)

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
        app.listen(PORT, () => console.log('Приложение запущено'))
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}

start()

