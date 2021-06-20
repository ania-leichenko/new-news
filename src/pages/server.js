import { useSession, getSession } from 'next-auth/client'
import Layout from '../components/layout'

export default function Page () {
  const [ session, loading ] = useSession()

  return (
    <Layout>
      
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}
