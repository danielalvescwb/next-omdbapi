import axios from 'axios'
import { GetServerSideProps } from 'next'
export default function oAuthGithubCallback({ code }) {
  return <>{code}</>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query

  const response = await axios.get(
    `${process.env.NEXT_BASE_URL_API}/o-auth-github-callback?code=${code}`,
  )
  console.log(response.data)

  return {
    props: { code: `teste` }, // will be passed to the page component as props
  }
}
