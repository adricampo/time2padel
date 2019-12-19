const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const { random, floor } = Math
const retrieveUserTeams = require('.')
const { errors: { NotFoundError } } = require('time2padel-util')
const { database, models: { User, Team } } = require('time2padel-data')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

describe('logic - retrieve user teams', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, index, genders, gender, teams
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
        token = jwt.sign({ sub:id }, TEST_SECRET) 
    })

    it('should succeed on correct user id', async () => {
        let user = await User.findById(id)
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        user.teams.push(team)
        await retrieveUserTeams(token)

        expect(user).toBeDefined()
        expect(typeof(user.teams)).toBe('object')
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'
        const token = jwt.sign({ sub: id }, TEST_SECRET)
        try {
            await retrieveUserTeams(token)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe(`user with id ${id} not found`)
        }
    })

    afterAll(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})