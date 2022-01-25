import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (func: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req: NextApiRequest, res: NextApiResponse, next: any) =>
    Promise.resolve(func(req, res, next)).catch(next)
