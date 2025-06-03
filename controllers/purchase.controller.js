import Purchase from '../models/purchase.model.js';
import Vehicles from '../models/vehicles.model.js';
import Client from '../models/client.model.js';

const createPurchase = async (req, res) => {
  const { clientId, vehicleId, price } = req.body;

  try {
    const client = await Client.findById(clientId);
    const vehicle = await Vehicles.findById(vehicleId);

    if (!client || !vehicle) {
      return res.status(404).json({ error: 'Client or Vehicle not found' });
    }

    const purchase = new Purchase({
      client: clientId,
      vehicle: vehicleId,
      price
    });

    await purchase.save();

    res.status(201).json({ message: 'Purchase created successfully', purchase });
  } catch (error) {
    res.status(500).json({ error: 'Server error', detail: error.message });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('client')
      .populate('vehicle');
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Server error', detail: error.message });
  }
};

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findById(id)
      .populate('client')
      .populate('vehicle');

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Server error', detail: error.message });
  }
};

const deletePurchase = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findByIdAndDelete(id);

    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', detail: error.message });
  }
};

const purchasesController = {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  deletePurchase
};

export default purchasesController;
