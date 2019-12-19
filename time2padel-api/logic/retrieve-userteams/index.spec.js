require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const { random, floor } = Math
const retrieveUserTeams = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { User, Team } } = require('time2padel-data')
const bcrypt = require('bcryptjs')

describe('logic - retrieve user teams', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, username, password, index, genders, gender, teams
    genders = ['MALE', 'FEMALE']
    index = floor(random()* 2)

    let title, player1, player2, wins, loses, status

    beforeEach(async () => { 
        // TEAM
        const p1 = await User.create({username : `username1-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `username2-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        player1 = p1.id
        player2 = p2.id
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = 'ACCEPTED'
        // USER
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        gender = genders[index]

        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const user = await User.create({ name, surname, email, username, password: await bcrypt.hash(password, 10), gender, teams })
        id = user.id
    })

    it('should succeed on correct user id', async () => { debugger
        let user = await User.findById(id)
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        user.teams.push(team)
        await retrieveUserTeams(user.id)

        expect(user).to.exist
        expect(user.teams).to.be.an('array')
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveUserTeams(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})