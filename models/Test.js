const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    test: [{
        question: {type: String, required: true},
        rightAnswerId: {type: Number},
        answers: [{
            text: {type: String},
            answerId: {type: Number}
        }]
    }],
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Test', schema)