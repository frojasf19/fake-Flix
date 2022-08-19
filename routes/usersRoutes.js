import express from 'express'
import { addSerie, addUser, listUsers, listUsersPlan, listCategory, listSerie, switchPlan, play, playUser } from '../controller/userController.js'

const routesUsers = express()
routesUsers.use(express.json())
routesUsers.get('/users/', listUsers)
routesUsers.get('/users/:plan', listUsersPlan)
routesUsers.get('/users/play/:email', playUser) 
routesUsers.get('/users/play/:email/:serie', playUser) 

routesUsers.post('/users/', addUser)

routesUsers.patch('/users/play/', play)
routesUsers.patch('/users/:email', switchPlan)


routesUsers.get('/series/', listSerie)
routesUsers.get('/series/:category', listCategory)
routesUsers.post('/series/', addSerie)


export default routesUsers