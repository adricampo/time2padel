require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const deleteUser = require('.')
const { random, floor } = Math
const { errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { database, ObjectId, models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')

describe('logic - delete user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, username, password, index, genders, gender
    genders = ['MALE', 'FEMALE']
    index = floor(random()* 2)

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = '`password-${random()}`'
        gender = genders[index]

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, password: await bcrypt.hash(password, 10), gender })
    
        id = user.id
    })

    it('should succeed on correct data', async () => {
        await deleteUser(id)

        const user = await User.findById(id)

        expect(user).not.to.exist
        // expect(user.username).to.equal(username)

        // const match = await bcrypt.compare(password, user.password)
        // expect(match).to.be.true
      
    })


    it('should fail on wrong user id or not existing', async () => {
        const id = '012345678901234567890123'

        try {
            await deleteUser(id)
            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} does not exist`)
        }
    })

    after(() => User.deleteMany().then(database.disconnect))
})

    