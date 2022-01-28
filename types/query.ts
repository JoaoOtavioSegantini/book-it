import { NextApiRequest } from 'next'

export type RoomsQuery = {
  req: NextApiRequest
  query: {
    page: number
    location: string
    guests: number
    category: string
  }
}
