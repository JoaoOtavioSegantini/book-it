import { NextApiRequest, NextApiResponse } from 'next'
import Room from '@models/room'
import catchAsync from '@middlewares/catchAsync'
import ErrorHandler from '@utils/errorHandler'

export const allRooms = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const rooms = await Room.find()
    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms
    })
  }
)

export const newRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.create(req.body)

    res.status(200).json({
      success: true,
      room
    })
  }
)

export const getSingleRoom = catchAsync(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: any
  ) => {
    const room = await Room.findById(req.query.id)
    if (!room) {
      return next(new ErrorHandler('Room not found with this ID', 404))
    }
    res.status(200).json({
      success: true,
      room
    })
  }
)

export const updateRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    let room = await Room.findById(req.query.id)
    if (!room) {
      res.status(404).json({
        success: false,
        error: 'room not found with this id'
      })
    }
    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      runValidators: true,
      new: true
    })
    res.status(200).json({
      success: true,
      room
    })
  }
)

export const deleteRoom = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const room = await Room.findById(req.query.id)

    if (!room) {
      res.status(404).json({
        success: false,
        error: 'room not found with this id'
      })
    }

    await room.remove()
    res.status(200).json({
      success: true,
      message: 'room is deleted'
    })
  }
)
