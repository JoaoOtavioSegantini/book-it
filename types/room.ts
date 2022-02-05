import { Review } from './review'
import { User } from './user'

export type Room = {
  _id: string
  name: string
  description: string
  address: string
  guestCapacity: number
  numOfBeds: number
  internet: boolean
  breakfast: boolean
  airConditioned: boolean
  petsAllowed: boolean
  roomCleaning: boolean
  ratings: number
  numOfReviews: number
  images: [
    {
      public_id: string
      url: string
    }
  ]
  category: 'King' | 'Single' | 'Twins'
  reviews: [Review]
  user: User
  createdAt: Date
  price: number
}
