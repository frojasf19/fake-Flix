import express from 'express'
import { addUser, listUsers, listUsersPlan } from '../controller/userController.js'

const routesUsers = express()
routesUsers.use(express.json())
routesUsers.get('/', listUsers)
routesUsers.get('/:plan', listUsersPlan)

routesUsers.post('/', addUser)

export default routesUsers