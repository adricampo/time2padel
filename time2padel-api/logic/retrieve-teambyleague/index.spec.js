require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const retrieveTeamByLeague = require('.')
const { random, floor } = Math
const { database, models: { Team, User, League } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - retrieve team by league', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, player1, player2, wins, loses, status, index, statuses
    statuses = ['PENDING', 'ACCEPTED', 'DENNIED']
    index = floor(random()* 3)

    let levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time, teams

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
    
        //LEAGUE
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]
        teams = []
        
        await Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()])

        // const team = await Team.create({ title, player1, player2, wins, loses, status })
        // id = team.id
    })

    it('should succeed on correct team id', async () => {
        let league = await League.create({ level, gender, date, time, teams })
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        league.teams.push(team)
        const myTeams = league.teams.map(team => team._id.toString())
   
        await retrieveTeamByLeague(league.id)

        expect(league).to.exist
        expect(league.level).to.equal(level)
        expect(league.gender).to.equal(gender)
        expect(league.date).to.equal(date)
        expect(league.time).to.equal(time)
        expect(league.teams[0].id).to.equal(myTeams[0])
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()]).then(database.disconnect))
})