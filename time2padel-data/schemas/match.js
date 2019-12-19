const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    teams: [{ 
        type: ObjectId,
        ref: 'Team'
    }] 
})
