export type User = {
  avatar?: {
    public_id: string
    url: string
  }
  _id?: string
  name: string
  email: string
  password?: string
  role?: string
  createdAt?: Date
  resetPasswordToken?: string
  resetPasswordExpire?: Date
}
