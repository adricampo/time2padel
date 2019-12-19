require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createLeague = require('.')
const { random, floor } = Math
const { database, models: { League } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - create league', () => {
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

    
    beforeEach(() => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]

        return League.deleteMany()

    })

    it('should succeed on correct league data', async () => { 
        const leagueId = await createLeague(level, gender, date, time) 
        expect(leagueId).not.to.exist
        // expect(leagueId).to.have.length.greaterThan(0)
        
        const league = await League.findOne( {level, gender, date, time } )
        
        expect(league).to.exist
        expect(league.level).to.equal(level)
        expect(league.gender).to.equal(gender)
        expect(league.date).to.equal(date)
        expect(league.time).to.equal(time)

    })

    it('should fail on already existing league', async () => {
        const _league = await League.create({ level, gender, date, time })
    
        try {
            await createLeague(level, gender, date, time)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error.message).to.exist
            expect(typeof error.message).to.equal('string')
            expect(error.message.length).to.be.greaterThan(0)
            expect(error.message).to.equal(`This league already exists`)
        }
    })

    after(() => League.deleteMany().then(database.disconnect))
})