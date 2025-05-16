import jwt from 'jsonwebtoken'

function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return token
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export { generateToken, verifyToken }
