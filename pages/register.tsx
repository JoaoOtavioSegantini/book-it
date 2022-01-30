import { Layout, Register } from '@components'
import { getSession } from 'next-auth/client'
import { NextPageContext } from 'next/types'

export default function RegisterPage() {
  return (
    <Layout title="Register">
      <Register />
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
