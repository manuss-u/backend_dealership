import { allowedRoles } from '../models/user.model.js'
import { authenticate, authorize } from '../middlewares/auth.middleware.js'
import { Router } from 'express'
import clientController from '../controllers/client.controller.js'

const router = Router()

router.post('/', authenticate, authorize([allowedRoles.ADMIN]), clientController.createClient)
router.get('/', authenticate, authorize([allowedRoles.ADMIN]), clientController.getAllClients)
router.get('/:id', authenticate, authorize([allowedRoles.ADMIN]), clientController.getClientById)
router.get('/search', authenticate, authorize([allowedRoles.ADMIN]), clientController.searchClients)
router.put('/:id', authenticate, authorize([allowedRoles.ADMIN]), clientController.updateClient)
router.delete('/:id', authenticate, authorize([allowedRoles.ADMIN]), clientController.deleteClient)

export default router
