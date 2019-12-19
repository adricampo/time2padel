const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const addTeamToLeague = require('.')
const { random, floor } = Math
const { database, models: { Team, User, League, PlayingDay, Match } } = require('time2padel-data')
const { errors: { ConflictError } } = require('time2padel-util')

describe('logic - add team to league', () => {
    beforeAll(() => database.connect(TEST_DB_URL))
    
    let title, player1, player2, wins, loses, status, token

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
        // token = jwt.sign({ sub: player1 }, TEST_SECRET) 
        player2 = p2.id
        // token = jwt.sign({ sub: player2 }, TEST_SECRET) 
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = 'ACCEPTED'
    
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
    it('should succeed if team status is ACCEPTED & number of teams in the league is less than 6', async () => { 
        let league = await League.create({ level, gender, date, time, teams })
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        league.teams.push(team)

        const myTeams = league.teams.map(team => team._id.toString())
        
        await addTeamToLeague(league.id, team.id)

        expect(league).toBeDefined()
        expect(league.level).toBe(level)
        expect(league.gender).toBe(gender)
        expect(league.date).toBe(date)
        expect(league.time).toBe(time)
        expect(league.teams.length).toBeLessThan(6)
    })
    
    it('should fail if number of teams in the league is already 6', async () => { 
        let league = await League.create({ level, gender, date, time, teams })
        const team1 = await Team.create({ title, player1, player2, wins, loses, status })
        const team2 = await Team.create({ title, player1, player2, wins, loses, status })
        const team3 = await Team.create({ title, player1, player2, wins, loses, status })
        const team4 = await Team.create({ title, player1, player2, wins, loses, status })
        const team5 = await Team.create({ title, player1, player2, wins, loses, status })
        const team6 = await Team.create({ title, player1, player2, wins, loses, status })
        league.teams.push(team1,team2,team3,team4,team5,team6)
        
        const myTeams = league.teams.map(team => team._id.toString())
        
        try{
            const team = await Team.create({ title, player1, player2, wins, loses, status })
            await addTeamToLeague(league.id, team.id)
            throw new Error(`Sorry, this league is complete`)
        } catch(error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe(`Sorry, this league is complete`)
        }
    })

    it('should fail if status of the team is not ACCEPTED', async () => {
        let league = await League.create({ level, gender, date, time, teams })
        let team = await Team.create({ title, player1, player2, wins, loses, status })
        team.status = 'PENDING'
        league.teams.push(team)

        try{
            await addTeamToLeague(league.id, team.id)
            throw new Error(`You should validate your team ${team.id} to continue`)
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe(`You should validate your team ${team.id} to continue`)
        }
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

    afterAll(() => Promise.all([Team.deleteMany(), User.deleteMany(), League.deleteMany(), PlayingDay.deleteMany(), Match.deleteMany()]).then(database.disconnect))

})