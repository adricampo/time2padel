require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const retrieveLeague = require('.')
const { random, floor } = Math
const { database, models: { League } } = require('time2padel-data')
const { errors: { NotFoundError } } = require('time2padel-util')

describe('logic - retrieve league', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time

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

        const league = await League.create({ level, gender, date, time })
        id = league.id
    })

    it('should succeed on correct data', async () => {
        const league = await retrieveLeague(id)

        expect(league).to.exist
        expect(league.level).to.equal(level)
        expect(league.date).to.equal(date)
        expect(league.time).to.equal(time)

    })

    it('should fail on wrong league id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveLeague(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`League not found`)
        }
    })

    after(() => League.deleteMany().then(database.disconnect))
})