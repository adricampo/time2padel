require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const listTeams = require('.')
const { random, floor } = Math
const { database, ObjectId, models: { User, Team } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - list teams', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, email, username, password, titles, player1s, player2s, winsTotal, losesTotal
    
    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        id = user.id

        teamIds = []
        titles = []
        player1s = []
        player2s = []
        winsTotal = []
        losesTotal = []

        const insertions = []

        for (let i = 0; i < 3; i++) {
            const team = {
                user: id,
                title : `title-${random()}`,
                player1 : user.id,
                player2 : user.id,
                wins : `wins-${random()}`,
                loses : `loses-${random()}`
            }

            // const {user, title, player1, player2, wins, loses} = team

            insertions.push(Team.create(team).then(team => teamIds.push(team.id)))

            titles.push(team.title)
            winsTotal.push(team.wins)
            losesTotal.push(team.loses)

        }

        for (let i = 0; i < 3; i++)
            insertions.push(Team.create({
                user : ObjectId(),
                title : `title-${random()}`,
                player1 : user.id,
                player2 : user.id,
                wins : `wins-${random()}`,
                loses : `loses-${random()}`
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and team data', async () => {
        const teams = await listTeams(id)

        expect(teams).to.exist
        expect(teams).to.have.lengthOf(6)

        teams.forEach(team => {
            expect(team.id).to.exist
            expect(team.id).to.be.a('string')
            expect(team.id).to.have.length.greaterThan(0)

            expect(team.title).to.exist
            expect(team.title).to.be.a('string')
            expect(team.title).to.have.length.greaterThan(0)

            expect(team.player1).to.exist
            expect(team.player2).to.exist

            expect(team.wins).to.exist
            expect(team.wins).to.be.a('string')
            expect(team.wins).to.have.length.greaterThan(0)

            expect(team.loses).to.exist
            expect(team.loses).to.be.a('string')
            expect(team.loses).to.have.length.greaterThan(0)
        })
    })

    after(() => Promise.all([User.deleteMany(), Team.deleteMany()]).then(database.disconnect))
})