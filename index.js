import express from 'express'
import routesUsers from './routes/usersRoutes.js'

const app = express()

app.use(express.json())

app.use('/', routesUsers)

const PORT = 3001

app.listen(PORT, ()=>{
    console.log('Api conectada')
})