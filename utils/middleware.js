const morgan = require('morgan')

morgan.token('body', (req) => JSON.stringify(req.body))

const requestLogger = morgan(':method :url :status :response-time ms - :res[content-length] :body')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }