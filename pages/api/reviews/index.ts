import nc from 'next-connect'
import dbConnect from '@config/dbConnect'

import {
  createRoomReview,
  deleteReview,
  getRoomReviews
} from '@controllers/roomController'

import onError from '@middlewares/errors'
import { authorizeRoles, isAuthenticatedUser } from '@middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler
  .use(isAuthenticatedUser)
  .put(createRoomReview)
  .get(getRoomReviews)
  .use(authorizeRoles('admin'))
  .delete(deleteReview)

export default handler
