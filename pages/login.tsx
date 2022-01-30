import { Layout, Login } from '@components'
import { getSession } from 'next-auth/client'
import { NextPageContext } from 'next/types'

export default function LoginPage() {
  return (
    <Layout title="Login">
      <Login />
    </Layout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
