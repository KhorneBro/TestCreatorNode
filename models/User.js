const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    telegram: {type: String, required: false},
    status: {type: String},
    date: {type: Date, default: Date.now},
    tests: [{type: Types.ObjectId, ref: 'Test'}]
})

module.exports = model('User', schema)