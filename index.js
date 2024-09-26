const express = require('express')
const dotenv = require('dotenv')
const usersRoute = require('./routes/usersRoute')
const error  = require('./middleware/errorMiddlewareHandler')
const bookRouter = require('./routes/bookRoutes')
dotenv.config()

require('./config/dbConfig')()
const app = express()

// passing body data 
app.use(express.json())  // enable the parsing of incoming JSON request bodies.

app.use('/api/users',usersRoute)
app.use('/api/books',bookRouter)

app.use(error.errorMiddlewareHandler)

const PORT = 7000
app.listen(PORT ,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})