/* eslint-disable @typescript-eslint/no-unused-vars */
import ErrorHandler from '@utils/errorHandler'
import { NextApiRequest, NextApiResponse } from 'next'

export default (
  err: ErrorHandler,
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: any
) => {
  err.statusCode = err.statusCode || 500
  let error = { ...err }

  error.message = err.message
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    error = new ErrorHandler(message, 400)
  }

  if (err.name === 'ValidationError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = Object.values(err.errors).map((value: any) => value.message)
    error = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack
  })
}
