import { Details, Layout } from '@components'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { wrapper } from 'store'
import { getRoomDetails } from 'store/actions/roomActions'

type Props = {
  id: string
}
const RoomDetails = ({ id }: Props) => {
  return (
    <Layout>
      <Details id={id} />
    </Layout>
  )
}

export default RoomDetails

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = (wrapper as any).getServerSideProps(
  (store: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: (arg0: (dispatch: Dispatch<AnyAction>) => Promise<void>) => any
    }) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ req, params }: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await store.dispatch(getRoomDetails(req, params.id) as any)

      return {
        props: { id: params.id }
      }
    }
)
