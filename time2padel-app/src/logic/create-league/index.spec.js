const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const createLeague = require('.')
const { random, floor } = Math
const { database, models: { League } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - create league', () => {
    beforeAll(() => database.connect(TEST_DB_URL))
    
    let levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time

    levels = ['D', 'C-', 'C+', 'B-', 'B+', 'A']
    indexlevel = floor(random() * 6)

    genders = ['MALE', 'FEMALE']
    indexgender = floor(random() * 2)
    
    dates = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
    indexdates = floor(random() * 5)

    times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
    indextimes = floor(random() * 8)

    
    beforeEach(() => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]

        return League.deleteMany()

    })

    it('should succeed on correct league data', async () => { 
        const leagueId = await createLeague(level, gender, date, time) 
        expect(leagueId).toBeUndefined()
        // expect(leagueId).to.have.length.greaterThan(0)
        
        const league = await League.findOne( { level, gender, date, time } )
        
        expect(league).toBeDefined()
        expect(league.level).toBe(level)
        expect(league.gender).toBe(gender)
        expect(league.date).toBe(date)
        expect(league.time).toBe(time)

    })

    it('should fail on already existing league', async () => {
        const _league = await League.create({ level, gender, date, time })
    
        try {
            await createLeague(level, gender, date, time)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)
            expect(error.message).toBe(`This league already exists`)
        }
    })

    afterAll(() => League.deleteMany().then(database.disconnect))
})