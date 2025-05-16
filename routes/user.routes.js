import { authenticate, authorize } from '../middlewares/auth.middleware.js'
import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use(authenticate)
router.get('/', authorize(['admin']), userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', authorize(['admin']), userController.updateUser)
router.delete('/:id', authorize(['admin']), userController.deleteUser)

export default router
