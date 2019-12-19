const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    player1: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    player2: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    wins: {
        type: String,
        default: 0
    },
    loses: {
        type: String,
        default: 0
    },
    status: {
        type: String,
        enum: ['PENDING', 'DENNIED', 'ACCEPTED'],
        default: 'PENDING'
    },
    leagues: {
        type: [ObjectId],
        ref: 'League'
    }

})