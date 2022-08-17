import express from 'express'
import { addSerie, addUser, listUsers, listUsersPlan, switchPlan } from '../controller/userController.js'

const routesUsers = express()
routesUsers.use(express.json())
routesUsers.get('/users/', listUsers)
routesUsers.get('/users/:plan', listUsersPlan)
routesUsers.post('/users/', addUser)
routesUsers.patch('/users/:email', switchPlan)


// routesUsers.get('/series/', listUsers)
// routesUsers.get('/series/:plan', listUsersPlan)
routesUsers.post('/series/', addSerie)
// routesUsers.patch('/series/:email', switchPlan)

export default routesUsers