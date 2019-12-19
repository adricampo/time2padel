const { Schema } = require('mongoose')
const Match = require('./match')

module.exports = new Schema({
    matches: [Match]
})