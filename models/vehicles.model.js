import mongoose from 'mongoose'

const VehiclesSchema = new mongoose.Schema(
  {
    vin: {
      type: String,
      required: true,
      unique: true
    },
    year: {
      type: Number,
      required: true
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true
    },
    mileage: {
        type: Number,
        required: true
      }
  },
  { timestamps: true }
)

const Vehicles = mongoose.model('Vehicles', VehiclesSchema)

export default Vehicles