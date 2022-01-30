import { Layout, Profile } from '@components'
import { getSession } from 'next-auth/client'

import { NextPageContext } from 'next/types'

const UpdateProfilePage = () => {
  return (
    <Layout title="Update Profile">
      <Profile />
    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

export default UpdateProfilePage
