//// "NOSEPORQUENOANDA "¯\_(ツ)_/¯" LOL   
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/auth')
const listsRoutes = require('./routes/api/lists')
const dinersRoutes = require('./routes/api/diners')

const auth = require('./middlewares/auth')

const connectDB = require('./config/db')

//iniciamos el mware
app.use(express.json({extended : false}))

//conectamos a db
connectDB()
//test
app.get('/test', (req, res) => res.send('BEnd api rest activo') )

//routes

app.use('/api/users', usersRoutes)
app.use('/api/diners', dinersRoutes)
app.use('/api/auth',  authRoutes)
app.use('/api/lists', listsRoutes)

app.listen(PORT , () => {
   console.log(`servidor iniciado en el puerto: ${PORT}`)
})