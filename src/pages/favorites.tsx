import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { AxiosResponse } from 'axios'
import { StarIcon } from '@chakra-ui/icons'
import { Button, useToast } from '@chakra-ui/react'

import { withSSRAuth } from '../attachment/Auth/utils/withSSRAuth'
import { setupAPIClient } from '../attachment/Auth/services/apiAuth'
import { Film, IMovie } from '../components/Films/Film'
import { apiAuthClient } from '../attachment/Auth/services/apiAuthClient'

import dynamic from 'next/dynamic'

const WithSubnavigation = dynamic(import('../components/Navigation/Navbar/'), {
  ssr: false,
})

interface IData {
  avatar_url: string
  favoritesInOAuth: IMovie[]
}

interface IResponse {
  data: IData[]
}

export default function Favorites({ response }: { response: IResponse }) {
  const [favorites, setFavorites] = useState<IMovie[]>()
  const toast = useToast()

  useEffect(() => {
    if (response?.data[0]) {
      setFavorites(response.data[0].favoritesInOAuth)
    }
  }, [])

  async function handleFavorite(imdbID) {
    try {
      await apiAuthClient.delete(`/favorites-remove/${imdbID}`)
      const response = await apiAuthClient.get(
        `${process.env.NEXT_PUBLIC_API}/favorites-show`,
      )
      console.log(response.data)

      if (response.data.data[0]) {
        setFavorites(response.data.data[0].favoritesInOAuth)
      }
      toast({
        title: 'Remove Favorite',
        description: 'Success to remove a favorite',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      })
    } catch (error) {
      if (error.response?.data?.message === 'favorite already exists') {
        toast({
          title: 'Error',
          description:
            'This movie is already in your favorites, go to manage favorites by clicking on your avatar',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
      } else {
        toast({
          title: 'Error',
          description: 'Internal server error',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        })
      }
    }
  }

  return (
    <>
      <WithSubnavigation />

      {favorites && (
        <>
          {favorites.map((movie, i) => (
            <Film
              key={`key-${i}`}
              Actors={movie.Actors}
              Awards={movie.Awards}
              BoxOffice={movie.BoxOffice}
              Country={movie.Country}
              Director={movie.Director}
              DVD={movie.DVD}
              Genre={movie.Genre}
              imdbID={movie.imdbID}
              imdbRating={movie.imdbRating}
              imdbVotes={movie.imdbVotes}
              Language={movie.Language}
              Metascore={movie.Metascore}
              Plot={movie.Plot}
              Poster={movie.Poster}
              Production={movie.Production}
              Rated={movie.Rated}
              Released={movie.Released}
              Response={movie.Response}
              Runtime={movie.Runtime}
              Title={movie.Title}
              Type={movie.Type}
              Website={movie.Website}
              Writer={movie.Writer}
              Year={movie.Year}
              Ratings={movie.Ratings}
            >
              <Button
                mt={3}
                leftIcon={<StarIcon />}
                colorScheme="yellow"
                variant="solid"
                onClick={() => handleFavorite(movie.imdbID)}
              >
                Remove to favorite
              </Button>
            </Film>
          ))}
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiAuthClientSSR = setupAPIClient(ctx)
    let response: AxiosResponse
    try {
      response = await apiAuthClientSSR.get(
        `${process.env.NEXT_PUBLIC_API}/favorites-show`,
      )
    } catch (error) {
      console.log(error)
    }
    return {
      props: { response: response.data },
    }
  },
)
