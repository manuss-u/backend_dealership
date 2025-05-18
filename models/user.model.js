import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const allowedRoles = ['admin', 'dealer']
const validateRole = (role) => {
  if (!allowedRoles.includes(role)) {
    throw new Error(`Invalid role: ${role}. Allowed roles are: ${allowedRoles.join(', ')}`)
  }
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

export { validateRole }

