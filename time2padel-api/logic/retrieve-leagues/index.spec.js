require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveLeagues = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { League } } = require('time2padel-data')

describe('logic - retrieve leagues', () => {
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


    beforeEach(async () => {
        level = levels[indexlevel]
        gender = genders[indexgender]
        date = dates[indexdates]
        time = times[indextimes]

        await League.deleteMany()

        const insertions = []

        for (let i = 0; i < 5; i++) 
            insertions.push(League.create({ 
                level, 
                gender, 
                date, 
                time }))
        await Promise.all(insertions)

    })

    it('should succeed on correct league', async () => {
        const leagues = await retrieveLeagues()
        expect(leagues).to.exist 
        expect(leagues).to.have.lengthOf(5)
    
        leagues.forEach(league => {
            expect(league.level).to.exist
            expect(league.level).to.be.a('string')
            
            expect(league.gender).to.exist
            expect(league.gender).to.be.a('string')

            expect(league.date).to.exist
            expect(league.date).to.be.a('string')

            expect(league.time).to.exist
            expect(league.time).to.be.a('string')
        })

    })

    after(() => League.deleteMany().then(database.disconnect))
})