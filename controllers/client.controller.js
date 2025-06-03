import Client from '../models/client.model.js'
import { validateEmail } from '../utils/validations.js'

const createClient = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  try {
    const client = new Client({ firstName, lastName, email, phone })
    await client.save()
    res.status(201).json({ message: 'Client created successfully', id: client._id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllClients = async (req, res) => {
  try {
    console.log('Fetching all clients')
    const clients = await Client.find()
    res.status(200).json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const getClientById = async (req, res) => {
  const { id } = req.params
  try {
    const client = await Client.findById(id)
    if (!client) {
      return res.status(404).json({ error: 'Client not found' })
    }
    res.status(200).json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const searchClients = async (req, res) => {
  const { firstName, lastName, email } = req.query
  const query = {}
  if (firstName) {
    query.firstName = { $regex: firstName, $options: 'i' }
  }
  if (lastName) {
    query.lastName = { $regex: lastName, $options: 'i' }
  }
  if (email) {
    query.email = { $regex: email, $options: 'i' }
  }
  try {
    const clients = await Client.find(query)
    if (clients.length === 0) {
      return res.status(404).json({ error: 'No clients found' })
    }
    res.status(200).json(clients)
  } catch (error) {
    console.error('Error searching clients:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateClient = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, email, phone } = req.body

  try {
    const client = await Client.findByIdAndUpdate(id, { firstName, lastName, email, phone }, { new: true })
    if (!client) {
      return res.status(404).json({ error: 'Client not found' })
    }
    res.status(200).json(client)
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(400).json({ error: `Error updating client: ${error.message}` })
  }
}

const deleteClient = async (req, res) => {
  const { id } = req.params

  try {
    const client = await Client.findByIdAndDelete(id)
    if (!client) {
      return res.status(404).json({ error: 'Client not found' })
    }
    res.status(200).json({ message: 'Client deleted successfully' })
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const clientController = {
  createClient,
  getAllClients,
  getClientById,
  searchClients,
  updateClient,
  deleteClient
}
export default clientController
