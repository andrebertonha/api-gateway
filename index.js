var http = require('http')
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const helmet = require('helmet')

const movieServiceProxy = httpProxy('http://localhost:3002')
const cinemaServiceProxy = httpProxy('http://localhost:3001')

app.get('/movies', (req, res, next) => {
    movieServiceProxy(req, res, next)
})

app.get('/cities', (req, res, next) => {
    cinemaServiceProxy(req, res, next)
})

app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

var server = http.createServer(app)
server.listen(3000)