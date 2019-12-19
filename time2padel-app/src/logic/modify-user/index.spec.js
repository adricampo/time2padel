const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const modifyUser = require('.')
const { random, floor } = Math
const { errors: { NotFoundError, CredentialsError } } = require('time2padel-util')
const { database, models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - modify user', () => {
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

    it('should succeed on correct data', async () => {
        const newUserName = `username-${random()}`
        const newPassword = `password-${random()}`

        const response = await modifyUser(token, newUserName, newPassword)

        expect(response).toBeUndefined()
    
        const user = await User.findById(id)

        expect(user.username).toBe(newUserName)
        expect(user.username).toBeOfType('string')
        const match = await bcrypt.compare(newPassword, user.password)
        expect(match).toBe(true)
        expect(user.password).toBeOfType('string')

    })


    // it('should fail on wrong user id or not existing', async () => {
    //     const _id = '012345678901234567890123'

    //     try {
    //         await modifyUser(_id, username, password)
    //         throw Error('should not reach this point')

    //     } catch (error) {
    //         expect(error).toBeDefined()
    //         expect(error).toBeInstanceOf(Error)

    //         const { message } = error
    //         expect(message).toBe(`user with id ${_id} does not exist`)
    //     }
    // })

    afterAll(() => User.deleteMany().then(database.disconnect))
})