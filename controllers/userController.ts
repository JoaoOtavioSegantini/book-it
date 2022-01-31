import { NextApiRequest, NextApiResponse } from 'next'
import User from '@models/user'
import catchAsync from '@middlewares/catchAsync'
import cloudinary from 'cloudinary'
import ErrorHandler from '@utils/errorHandler'
import absoluteUrl from 'next-absolute-url'
import sendEmail from '@utils/sendEmail'
import path from 'path'
import crypto, { BinaryLike } from 'crypto'

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

export const forgotPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: NextApiRequest & any, res: NextApiResponse, next: any) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return next(
        new ErrorHandler('O usuário com este email não foi encontrado', 404)
      )
    }

    const resetToken = user.getResetToken()

    await user.save({ validateBeforeSave: false })

    const { origin } = absoluteUrl(req)
    const resetUrl = `${origin}/password/reset/${resetToken}`

    const emailPath = path.join(
      __dirname,
      '../../../../../',
      'utils',
      'views',
      'emails',
      'reset-password-instructions.hbs'
    )

    const variables = {
      name: user.name,
      link: resetUrl,
      title: 'Você esqueceu sua senha?'
    }

    try {
      await sendEmail(
        {
          email: user.email,
          subject: 'BookIT Password Recovery'
        },
        variables,
        emailPath
      )

      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save({ validateBeforeSave: false })

      return next(new ErrorHandler((error as Error).message, 500))
    }
  }
)

// Reset password   =>   /api/password/reset/:token
export const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // Hash URL token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.query.token as BinaryLike)
      .digest('hex')

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return next(
        new ErrorHandler(
          'Password reset token is invalid or has been expired',
          400
        )
      )
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup the new password
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    })
  }
)
