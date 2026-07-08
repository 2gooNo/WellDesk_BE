import express from 'express'
export const userRouter = express.Router()
userRouter.get('/users', getAllUsers)
userRouter.get('/getuser', verifyToken, getUser)
userRouter.post('/user', createUser)
userRouter.post('/login', Login)