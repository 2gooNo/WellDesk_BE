import express from 'express'
import { getAllUsers,createUser,getUserbyid } from '../controller/user-controller.js'
export const userRouter = express.Router()
userRouter.get('/users', getAllUsers)
// userRouter.get('/getuser', verifyToken, getUser)
userRouter.post('/user', createUser)
userRouter.get('/user/:id', getUserbyid)
// userRouter.post('/login', Login)