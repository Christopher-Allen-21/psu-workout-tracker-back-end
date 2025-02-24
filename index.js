const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = YAML.load('./swagger.yaml')

const userRoutes = require('./routes/user.js')
const exerciseRoutes = require('./routes/exercise.js')
const programRoutes = require('./routes/program.js')
const workoutHistoryRoutes = require('./routes/workoutHistory.js')


// Setup and configuration
const app = express()
dotenv.config()

const PORT = process.env.PORT || 7000

const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200']
app.use(express.json())
app.use(
    cors({
        origin: function(origin, callback){
            // allow requests with no origin 
            // (like mobile apps or curl requests)
            if(!origin) return callback(null, true)
            if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.'
            return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use('/users', userRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/programs', programRoutes)
app.use('/workout-history', workoutHistoryRoutes)


app.listen(PORT, () => {
    console.log(`Listening on http://${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello World from Express and DynamoDb!')
})


// app.get('/users', async(req, res) => {
//     try {
//         const users = await getUsers()
//         res.json(users)
//     }
//     catch {
//         console.log(err)
//         res.status(500).json({err: "Something went wrong"})
//     }
// })

module.exports = app