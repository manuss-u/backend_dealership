import { generateToken } from '../utils/jwt.js'
import { validateEmail } from '../utils/validations.js'
import User, { allowedRoles, validateRole } from '../models/user.model.js'

const register = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const user = new User({ username, password, email, role: allowedRoles.DEALER })
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }
    await user.save()
    res.status(201).json({ message: 'User registered successfully', id: user._id })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  const messageInvalid = 'Invalid username or password'

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: messageInvalid })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: messageInvalid })
    }
    const token = generateToken(user)
    res.status(200).json({ token })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email, role } = req.body

  if (!username || !email || !role) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    validateRole(role)
    const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(400).json({ error: `Error updating user: ${error.message}` })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const userController = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
export default userController
