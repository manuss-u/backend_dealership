import { allowedRoles } from '../models/user.model.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { Router } from 'express';
import vehicleController from '../controllers/vehicles.controller.js';

const router = Router();

router.post('/', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.createVehicle);
router.get('/', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.getAllVehicles);
router.get('/:id', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.getVehicleByVin);
router.get('/search', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.searchVehicles);
router.put('/:id', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.updateVehicle);
router.delete('/:id', authenticate, authorize([allowedRoles.ADMIN]), vehicleController.deleteVehicle);

export default router;
