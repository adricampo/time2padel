require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const retrieveLeaguebyTeam = require('.')
const { random, floor } = Math
const { database, models: { Team, User, League } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - retrieve league by team', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, player1, player2, wins, loses, status, index, statuses
    statuses = ['PENDING', 'ACCEPTED', 'DENNIED']
    index = floor(random()* 3)

    let levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time

    levels = ['D', 'C-', 'C+', 'B-', 'B+', 'A']
    indexlevel = floor(random() * 6)

    genders = ['MALE', 'FEMALE']
    indexgender = floor(random() * 2)
    
    dates = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
    indexdates = floor(random() * 5)

    times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
    indextimes = floor(random() * 8)

    beforeEach(async () => {
        //TEAM
        const p1 = await User.create({username : `username1-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `username2-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        player1 = p1.id
        player2 = p2.id
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = statuses[index]
        leagues = []
        //LEAGUE
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]
        
        await Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()])

        const team = await Team.create({ title, player1, player2, wins, loses, status, leagues })
        id = team.id
    })

    it('should succeed on correct team id', async () => { 
        const league = await League.create({ level, gender, date, time })
        let team = await Team.create({ title, player1, player2, wins, loses, status, leagues })
        team.leagues.push(league)
        const myLeagues = team.leagues.map(league => league._id.toString())
        // myLeagues.forEach(league => league.id)
        await retrieveLeaguebyTeam(team.id)

        expect(team).to.exist
        expect(team.title).to.equal(title)
        expect(team.player1.toString()).to.equal(player1)
        expect(team.player2.toString()).to.equal(player2)
        expect(team.leagues.toString()).to.equal(myLeagues[0])
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()]).then(database.disconnect))
})