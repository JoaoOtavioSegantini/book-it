import React from 'react'
import { Layout, Home } from '@components'
import { wrapper } from 'store'
import { getRooms } from 'store/actions/roomActions'
import { AnyAction, Dispatch } from 'redux'
import { RoomsQuery } from 'types/query'

const Index = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = (wrapper as any).getServerSideProps(
  (store: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: (arg0: (dispatch: Dispatch<AnyAction>) => Promise<void>) => any
    }) =>
    async ({ req, query }: RoomsQuery) => {
      await store.dispatch(
        getRooms(req, query.page, query.location, query.guests, query.category)
      )
    }
)
