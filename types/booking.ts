import { Room } from './room'
import { User } from './user'

export type Booking = {
  room: Room
  user: User
  checkInDate: Date
  checkOutDate: Date
  amountPaid: number
  daysOfStay: number
  paymentInfo: {
    id: string
    status: string
  }
  paidAt: Date
  createdAt: Date
}

export type Availability = Partial<Booking> & { roomId: string }
