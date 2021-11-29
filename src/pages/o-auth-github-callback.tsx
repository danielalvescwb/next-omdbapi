import { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { setCookie } from 'nookies'
import { apiAuthClient } from '../attachment/Auth/services/apiAuthClient'
export default function OAuthGithubCallback() {
  useEffect(() => {
    Router.push('/')
  }, [])

  return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query

  const response = await apiAuthClient.get(
    `${process.env.NEXT_PUBLIC_API}/o-auth-github-callback?code=${code}`,
  )
  const { refreshToken, token } = response.data
  setCookie(ctx, 'next-omdbapi.token', token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  setCookie(ctx, 'next-omdbapi.refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return {
    props: {},
  }
}
