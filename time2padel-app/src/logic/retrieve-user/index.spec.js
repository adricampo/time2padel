const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const { random, floor } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError, CredentialsError } } = require('time2padel-util')
const { database, models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - retrieve user', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, index, genders, gender
    genders = ['MALE', 'FEMALE']
    index = floor(random()* 2)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        gender = genders[index]

        await User.deleteMany()
        const user = await User.create({ name, surname, email, username, password: await bcrypt.hash(password, 10), gender })
        id = user.id 

        token = jwt.sign({ sub: id }, TEST_SECRET)
    })

    it('should succeed on correct user id', async () => { 
        const user = await retrieveUser(token)

        expect(user).toBeDefined()
        expect(user.id).toBe(id)
        expect(user.id).toBeOfType('string')
        expect(user._id).toBeUndefined()
        expect(user.name).toBe(name)
        expect(user.name).toBeOfType('string')
        expect(user.surname).toBe(surname)
        expect(user.surname).toBeOfType('string')
        expect(user.gender).toBe(gender)
        expect(user.email).toBe(email)
        expect(user.email).toBeOfType('string')
        expect(user.username).toBe(username)
        expect(user.username).toBeOfType('string')

    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        const token = jwt.sign({ sub: id }, TEST_SECRET)

        try {
            await retrieveUser(token)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`user with id ${id} not found`)
        }
    })

    afterAll(() => User.deleteMany().then(database.disconnect))
})