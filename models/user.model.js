import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const allowedRoles = {
  ADMIN: 'admin',
  DEALER: 'dealer'
}
const validateRole = (role) => {
  if (allowedRoles[role.toUpperCase()]) {
    return true
  }
  throw new Error(`Invalid role: ${role}`)
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: allowedRoles,
      validate: {
        validator: validateRole,
        message: (props) => `${props.value} is not a valid role!`
      },
      default: 'user'
    }
  },
  { timestamps: true }
)

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User

export { allowedRoles, validateRole }
