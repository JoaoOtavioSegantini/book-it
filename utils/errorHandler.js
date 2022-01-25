export default class ErrorHandler extends Error {
  constructor(msg, statusCode) {
    super(msg)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
    this.path = undefined
    this.errors = undefined
  }
}
