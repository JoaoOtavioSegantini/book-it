import nc from 'next-connect'
import dbConnect from '@config/dbConnect'
import onError from '@middlewares/errors'
import {
  deleteRoom,
  getSingleRoom,
  updateRoom
} from '@controllers/roomController'
const handler = nc({ onError })

dbConnect()

handler.get(getSingleRoom)
handler.put(updateRoom)
handler.delete(deleteRoom)

export default handler
