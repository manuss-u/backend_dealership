import express from 'express'
import userRoutes from './routes/user.routes.js'
import clientRoutes from './routes/client.routes.js'
import vehicleRoutes from './routes/vehicles.routes.js'
import purchaseRoutes from './routes/purchase.routes.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204)
  }
  next()
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/purchases', purchaseRoutes)

export default app
