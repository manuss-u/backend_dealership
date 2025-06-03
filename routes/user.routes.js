import { authenticate, authorize } from '../middlewares/auth.middleware.js'
import { Router } from 'express'
import userController from '../controllers/user.controller.js'
import { allowedRoles } from '../models/user.model.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/check-login', userController.checkLogin)

router.use(authenticate)
router.get('/', authorize([allowedRoles.ADMIN]), userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', authorize([allowedRoles.ADMIN]), userController.updateUser)
router.delete('/:id', authorize([allowedRoles.ADMIN]), userController.deleteUser)

export default router
