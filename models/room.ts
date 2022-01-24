import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true,
    maxlength: [100, 'o nome não pode exceder a 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'A descrição é obrigatória']
  },
  address: {
    type: String,
    required: [true, 'O endereço é obrigatório']
  },
  guestCapacity: {
    type: Number,
    required: [true, 'A capacidade é obrigatória']
  },
  numOfBeds: {
    type: Number,
    required: [true, 'O número de camas é obrigatório']
  },
  internet: {
    type: Boolean,
    default: false
  },
  breakfast: {
    type: Boolean,
    default: false
  },
  airConditioned: {
    type: Boolean,
    default: false
  },
  petsAllowed: {
    type: Boolean,
    default: false
  },
  roomCleaning: {
    type: Boolean,
    default: false
  },
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'A categoria é obrigatória'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'Selecione a categoria correta'
    }
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.models.Room || mongoose.model('Room', roomSchema)
