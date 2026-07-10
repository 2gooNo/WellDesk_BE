import express from 'express'
import {DailyPush,BackData } from '../controller/back-controller.js'
export const backRouter = express.Router()
backRouter.post('/daily',DailyPush)
backRouter.post('/backdata',BackData)
