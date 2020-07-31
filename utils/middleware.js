const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const requestLogger = morgan(':method :url :status :response-time ms - :res[content-length] :body')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    } else {
        req.token = null
    }
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.name, '#', error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(400).send({ error: 'token missing or invalid'})
    }

    next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor }