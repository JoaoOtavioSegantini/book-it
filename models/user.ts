import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, 'O seu nome não deve ultrapassar 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    validate: [validator.isEmail, 'O endereço é obrigatório']
  },
  password: {
    type: String,
    required: [true, 'Senha obrigatória'],
    minLength: [6, 'A deve conter no mínimo 6 digitos'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken
}

export default mongoose.models.User || mongoose.model('User', userSchema)
