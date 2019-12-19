require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const deleteLeague = require('.')
const { random, floor } = Math
const { errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { database, ObjectId, models: { League } } = require('time2padel-data')

describe('logic - delete league', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let levels, indexlevel, level, genders, indexgender, gender, dates, indexdates, date, times, indextimes, time, league

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

        const league = await League.create({ level, gender, date, time })
    
        id = league.id

    })

    it('should succeed on correct data', async () => {
        await deleteLeague(id)

        const league = await League.findById(id)

        expect(league).not.to.exist
      
    })


    it('should fail on wrong league id or not existing', async () => {
        const id = '012345678901234567890123'

        try {
            await deleteLeague(id)
            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`league with id ${id} does not exist`)
        }
    })

    after(() => League.deleteMany().then(database.disconnect))
})

    