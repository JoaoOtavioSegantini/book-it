import { Layout, MyBookings } from '@components'
import { GetServerSidePropsContext, NextApiRequest } from 'next'
import { getSession } from 'next-auth/client'
import { AnyAction, Dispatch } from 'redux'
import { wrapper } from 'store'
import { myBookings } from 'store/actions/bookingAction'

const MyBookingsPage = () => {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = (wrapper as any).getServerSideProps(
  (store: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: (arg0: (dispatch: Dispatch<AnyAction>) => Promise<void>) => any
    }) =>
    async ({ req }: GetServerSidePropsContext) => {
      const session = await getSession({ req })

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false
          }
        }
      }

      await store.dispatch(
        myBookings(req.headers.cookie!, req as NextApiRequest)
      )
    }
)

export default MyBookingsPage
