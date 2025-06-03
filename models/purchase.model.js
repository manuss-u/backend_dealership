import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicles',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', PurchaseSchema);

export default Purchase;
