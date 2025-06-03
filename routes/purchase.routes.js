import express from 'express';
import purchasesController from '../controllers/purchase.controller.js';

const router = express.Router();

router.post('/', purchasesController.createPurchase);
router.get('/', purchasesController.getAllPurchases);
router.get('/:id', purchasesController.getPurchaseById);
router.delete('/:id', purchasesController.deletePurchase);

export default router;
