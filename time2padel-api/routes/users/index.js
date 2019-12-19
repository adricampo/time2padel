const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, modifyUser, deleteUser, retrieveUserTeams} = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('time2padel-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

//REGISTER USER 
router.post('/', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password, gender } } = req

    try {
        registerUser(name, surname, email, username, password, gender)
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

//AUTHENTICATE USER
router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//RETRIEVE USER
router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json( user ))
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

//MODIFY USER
router.patch('/update', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { username, password } } = req

        modifyUser(id, username, password)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

//DELETE USER
router.delete('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        deleteUser(id)
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

//RETRIEVE USER TEAMS
router.get('/teams', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUserTeams(id)
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
