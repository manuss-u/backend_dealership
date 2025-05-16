import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
  })
}

export { connectDB, mongoose }
