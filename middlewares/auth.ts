import { getSession } from 'next-auth/client'
import { NextApiRequest, NextApiResponse } from 'next/types'
import ErrorHandler from '@utils/errorHandler'
import catchAsync from './catchAsync'

const isAuthenticatedUser = catchAsync(
  async (
    req: NextApiRequest,
    res: NextApiResponse,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: any
  ) => {
    const session = await getSession({ req })

    if (!session) {
      return next(
        new ErrorHandler(
          'Primeiro faça login antes de acessar este recurso',
          401
        )
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(req as any).user = (session as any).user
    next()
  }
)

export default isAuthenticatedUser
