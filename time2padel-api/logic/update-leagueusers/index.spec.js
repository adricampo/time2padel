const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const updateLeagueUsers = require('.')
const { random, floor } = Math
const { database, models: { Team, User, League } } = require('time2padel-data')
const { errors: { NotFoundError } } = require('time2padel-util')

describe('logic - update league users', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, player1, player2, wins, loses

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
    
        //LEAGUE
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]
        status = 'COMPLETED'
        teams = []
        
        await Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()])

        const team = await Team.create({ title, player1, player2, wins, loses })
        id = team.id
    })

    it('should succeed on correct data', async () => { 
        let league = await League.create({ level, gender, date, time, status, teams })
        const myTeams = league.teams.map(team => team._id.toString())
        await updateLeagueUsers(league.id)

        expect(league).to.exist
        expect(league.level).to.equal(level)
        expect(league.gender).to.equal(gender)
        expect(league.date).to.equal(date)
        expect(league.time).to.equal(time)
       
    })

    it('should fail if league does not exist', async () => { 
        const id = '012345678901234567890123'

        try{ 
            await updateLeagueUsers(id)
            throw new NotFoundError(`league not found`)
        } catch(error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`league not found`)
        }
       
    })

    it('should fail if league status is not COMPLETED', async () => { 
        let league = await League.create({ level, gender, date, time, status, teams })
        league.status = 'AVAILABLE'
        await league.save()
        // const myTeams = league.teams.map(team => team._id.toString())
        
        try{ 
            await updateLeagueUsers(league.id)
            throw new Error(`League status not COMPLETED`)
        } catch(error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`League status not COMPLETED`)
        }
    })


    it('should fail if team not exist on that league', async () => { 
        let league = await League.create({ level, gender, date, time, status, teams })
        const team1 = await Team.create({ title, player1, player2, wins, loses })
        const team2 = await Team.create({ title, player1, player2, wins, loses })
        const team3 = await Team.create({ title, player1, player2, wins, loses })
        const team4 = await Team.create({ title, player1, player2, wins, loses })
        const team5 = await Team.create({ title, player1, player2, wins, loses })
        const team6 = await Team.create({ title, player1, player2, wins, loses })
        league.teams.push(team1,team2,team3,team4,team5,team6)
        const myTeams = league.teams.map(team => team._id.toString())
        let wrongteam = await Team.create({ title, player1, player2, wins, loses })
        
        try{
            await updateLeagueUsers(league.id)
            throw new NotFoundError(`Team with id ${wrongteam.id} not found on that league`)
        } catch(error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`Team with id ${wrongteam.id} not found on that league`)
        }
        
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany()]).then(database.disconnect))

})