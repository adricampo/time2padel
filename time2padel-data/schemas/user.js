const { Schema, ObjectId } = require('mongoose')
const { validators: { isEmail } } = require('time2padel-util')

module.exports = new Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    username: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        default: 'MALE'
    },
    email: {
        type: String,
        validate: isEmail
    },
    password: {
        type: String,
    },
    leagues: {
        type: [ObjectId],
        ref: 'League'
    },
    teams: [{
        type: ObjectId,
        ref: 'Team'
    }]
})