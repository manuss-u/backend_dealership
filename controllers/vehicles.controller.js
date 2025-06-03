import Vehicles from "../models/vehicles.model.js";   

const createVehicle = async (req, res) => {
  const { vin, year, make, model, mileage } = req.body;

  try {
    const vehicle = new Vehicles({ vin, year, make, model, mileage });
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', id: vehicle._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicles.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
}   

const getVehicleByVin = async (req, res) => {
  const { vin } = req.params;
  try {
    const vehicle = await Vehicles.findById(vin);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const searchVehicles = async (req, res) => {
  const { vin, year, make, model } = req.query;
  const query = {};
  if (vin) {
    query.vin = { $regex: vin, $options: 'i' };
  }
  if (year) {
    query.year = year;
  }
  if (make) {
    query.make = { $regex: make, $options: 'i' };
  }
  if (model) {
    query.model = { $regex: model, $options: 'i' };
  }
  
  try {
    const vehicles = await Vehicles.find(query);
    if (vehicles.length === 0) {
      return res.status(404).json({ error: 'No vehicles found' });
    }
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error searching vehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateVehicle = async (req, res) => {
  const { vin } = req.params;
  const { year, make, model, mileage } = req.body;

  try {
    const vehicle = await Vehicles.findByIdAndUpdate(vin, { year, make, model, mileage }, { new: true });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const deleteVehicle = async (req, res) => {
  const { vin } = req.params;

  try {
    const vehicle = await Vehicles.findByIdAndDelete(vin);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const vehiclesController = {
  createVehicle,
  getAllVehicles,
  getVehicleByVin,
  searchVehicles,
  updateVehicle,
  deleteVehicle
}

export default vehiclesController