import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/usersController'
export const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' })
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error en la autenticación', err)
            return res.status(403).json({ error: 'No tienes acceso a este recurso' })
        }
        next()
    })
}

router.get('/', authenticateToken, getAllUsers)
router.post('/', authenticateToken, createUser)
router.get('/:id', authenticateToken, getUser)
router.delete('/:id', authenticateToken, deleteUser)
router.put('/:id', authenticateToken, updateUser)