const { Router } = require('express')
const { createTeam, updateTeam, deleteTeam, retrieveTeam, retrieveLeaguebyTeam, listTeams } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('time2padel-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

//CREATE TEAM
router.post('/', tokenVerifier, jsonBodyParser, (req, res) => { 
    const { id, body: { username, title } } = req

    try {
        createTeam(id, username, title)
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

//UPDATE TEAM
router.patch('/teamId', jsonBodyParser, tokenVerifier, (req, res) => {
    try {
        const { id, body: { teamId, answer } } = req

        updateTeam(id, teamId, answer)
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

//DELETE TEAM
router.delete('/', (req, res) => {
    try {
        const { body: { teamId } } = req

        deleteTeam(teamId)
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

//RETRIEVE TEAM //mirar ruta
router.post('/', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { body: { title } } = req

        retrieveTeam(title)
            .then(team => res.json( team ))
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

//RETRIEVE LEAGUES BY TEAM
router.get('/:id', jsonBodyParser, (req, res) => {
    try {
        const { params: { id } } = req

        retrieveLeaguebyTeam(id)
            .then(team => res.json( team ))
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

//LIST TEAMS
router.get('/', tokenVerifier, (req, res) => { 
    try {
        const { id } = req

        listTeams(id)
            .then(teams => res.json( teams ))
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


module.exports = router