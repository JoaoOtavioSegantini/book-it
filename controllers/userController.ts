import { NextApiRequest, NextApiResponse } from 'next'
import User from '@models/user'
import catchAsync from '@middlewares/catchAsync'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const registerUser = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'bookit/avatars',
      width: '150',
      crop: 'scale'
    })
    const { name, email, password } = req.body

    await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url
      }
    })

    res.status(200).json({
      success: true,
      message: 'Account created successfully'
    })
  }
)
export const currentUser = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: NextApiRequest & any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user
    })
  }
)

export const updateUserProfile = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: NextApiRequest & any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.email = req.body.email
      user.name = req.body.name

      if (req.body.password) user.password = req.body.password

      if (req.body.avatar !== '') {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: 'bookit/avatars',
          width: '150',
          crop: 'scale'
        })

        user.avatar = {
          public_id: result.public_id,
          url: result.secure_url
        }
      }
      await user.save()
    }

    res.status(200).json({
      success: true
    })
  }
)
