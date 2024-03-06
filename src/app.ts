import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {router as authRoutes} from './routes/authRoutes'
import {router as userRoutes} from './routes/userRoutes'

export const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)