const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const retrieveLeague = require('.')
const { random, floor } = Math
const { database, models: { League } } = require('time2padel-data')
const { errors: { NotFoundError } } = require('time2padel-util')

describe('logic - retrieve league', () => {
    beforeAll(() => database.connect(TEST_DB_URL))
    
    let id, levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time

    levels = ['D', 'C-', 'C+', 'B-', 'B+', 'A']
    indexlevel = floor(random() * 6)

    genders = ['MALE', 'FEMALE']
    indexgender = floor(random() * 2)
    
    dates = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
    indexdates = floor(random() * 5)

    times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
    indextimes = floor(random() * 8)


    beforeEach( async () => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]

        await League.deleteMany()

    })

    it('should succeed on correct data', async () => {
        const league = await League.create({ level, gender, date, time })
        id = league.id

        await retrieveLeague(id)

        expect(league).toBeDefined()
        expect(league.level).toBe(level)
        expect(league.date).toBe(date)
        expect(league.time).toBe(time)

    })

    it('should fail on wrong league id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveLeague(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`League not found`)
        }
    })

    afterAll(() => League.deleteMany().then(database.disconnect))
})