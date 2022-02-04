import { BookingDetails, Layout } from '@components'
import { getSession } from 'next-auth/client'
import { GetServerSidePropsContext, NextApiRequest } from 'next/types'
import { AnyAction, Dispatch } from 'redux'
import { wrapper } from 'store'
import { getBookingDetails } from 'store/actions/bookingAction'

const BookingDetailsPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = (wrapper as any).getServerSideProps(
  (store: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: (arg0: (dispatch: Dispatch<AnyAction>) => Promise<void>) => any
    }) =>
    async ({ req, params }: GetServerSidePropsContext) => {
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
        getBookingDetails(
          req.headers.cookie!,
          req as NextApiRequest,
          params!.id as string
        )
      )
    }
)

export default BookingDetailsPage
