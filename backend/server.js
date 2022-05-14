require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const cors = require('cors');
app.use(cors({origin: '*'}));

app.use(express.json())
const sitesRouter = require('./routes/sites')
app.use('/sites', sitesRouter)
app.use('/images',express.static(__dirname + '/assets'))


app.listen(process.env.PORT, () => console.log('Server Started'))