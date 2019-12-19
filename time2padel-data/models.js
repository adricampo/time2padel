const { model } = require('mongoose')
const { user, league, team, playingDay, match } = require('./schemas')

module.exports = {
    User: model('User', user),
    League: model('League', league),
    Team: model('Team', team),
    PlayingDay: model('PlayingDay', playingDay),
    Match: model('Match', match)

}