import NextAuth, { User } from 'next-auth'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Providers from 'next-auth/providers'

import UserModel from '@models/user'
import dbConnect from '@config/dbConnect'

type AuthorizeProps = {
  email: string
  password: string
}

export default NextAuth({
  session: {
    jwt: true
  },
  jwt: {
    signingKey: process.env.JWT_SECRET,
    secret: process.env.SECRET_JWT
  },
  providers: [
    Providers.Credentials({
      async authorize({ email, password }: AuthorizeProps) {
        dbConnect()

        if (!email || !password) {
          throw new Error('Please enter email or password')
        }

        const user = await UserModel.findOne({ email }).select('+password')

        if (!user) {
          throw new Error('Invalid Email or Password')
        }

        const isPasswordMatched = await user.comparePassword(password)

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }

        return Promise.resolve(user)
      }
    })
  ],
  callbacks: {
    jwt: async (token: JWT, user: User) => {
      user && (token.user = user)
      return Promise.resolve(token)
    },
    session: async (session: Session, user: User) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(session.user as any) = user.user
      return Promise.resolve(session)
    }
  }
})
