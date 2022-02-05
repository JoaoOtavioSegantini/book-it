import { User } from './user'

export type Review = {
  _id: string
  user: User
  name: string
  rating: number
  comment: string
}
