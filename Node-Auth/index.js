const express = require('express')
const app = express()



// IMPORT ROUTE

const authRoute = require('./routes/auth')


//ROUTE MIDDLEWARE
app.use('api/user', authRoute)

app.listen(2000, ()=> console.log('Server ON!'))