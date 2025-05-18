import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Client = mongoose.model('Client', ClientSchema)

export default Client
