const { Router } = require('express')
const { createLeague, deleteLeague, retrieveLeagues, addTeamToLeague, retrieveTeamByLeague, retrieveLeague, updateLeagueUsers } = require('../../logic')
// const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('time2padel-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

//CREATE LEAGUE
router.post('/', jsonBodyParser, (req, res) => {
    const { body: { level, gender, date, time } } = req

    try {
        createLeague(level, gender, date, time)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//DELETE LEAGUE
router.delete('/:id', (req, res) => {
    try {
        const { params: { id } } = req

        deleteLeague(id)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//RETRIEVE LEAGUES
router.get('/', jsonBodyParser, (req, res) => {
    try {
        retrieveLeagues()
            .then(league => res.json(league))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

// ADD TEAM TO LEAGUE
router.post('/:leagueId/team/:teamId', jsonBodyParser, (req, res) => {
    try {
        const { params: { leagueId, teamId } } = req

        addTeamToLeague(leagueId, teamId)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//RETRIEVE TEAMS BY LEAGUE
router.get('/add/:id', jsonBodyParser, (req, res) => {
    try {
        const { params: { id } } = req

        retrieveTeamByLeague(id)
            .then(league => res.json( league ))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

//RETRIEVE LEAGUE
router.get('/:leagueId', jsonBodyParser, (req, res) => {
    try { 
        const { params: { leagueId } } = req
        
        retrieveLeague(leagueId)
            .then(league => res.json(league))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

//UPDATE LEAGUE USERS
router.patch('/:leagueId', jsonBodyParser, (req, res) => { 
    try {
        const { params: { leagueId } } = req

        updateLeagueUsers(leagueId)
            .then(() =>
                res.end()
            )
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})
module.exports = router