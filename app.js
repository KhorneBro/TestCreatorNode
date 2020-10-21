const express = require('express');
const config = require('config')
const mongoose = require('mongoose');

const PORT = config.get('port') || 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/test', require('./routes/test.routes'))

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

