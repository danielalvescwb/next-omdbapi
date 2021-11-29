import { GetStaticPaths, GetStaticProps } from 'next'
import { Button, SimpleGrid, useToast } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { apiAuthClient } from '../../attachment/Auth/services/apiAuthClient'
import { Film, IMovieRequest } from '../../components/Films/Film'

export default function Movie({ movie }: { movie: IMovieRequest }) {
  const toast = useToast()
  async function handleFavorite(imdbID) {
    try {
      const resopnse = await apiAuthClient.post(`/favorites-add/${imdbID}`)
      console.log(resopnse)
      toast({
        title: 'Add Favorite',
        description: 'Success to add a favorite',
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

    console.log(imdbID)
  }
  return (
    <>
      {movie && (
        <SimpleGrid
          minChildWidth={{ base: '300px', md: '400px', lg: '400px' }}
          spacing={4}
          p={5}
          w={'full'}
          minH={'100vh'}
        >
          <Film
            Actors={movie.data.Actors}
            Awards={movie.data.Awards}
            BoxOffice={movie.data.BoxOffice}
            Country={movie.data.Country}
            Director={movie.data.Director}
            DVD={movie.data.DVD}
            Genre={movie.data.Genre}
            imdbID={movie.data.imdbID}
            imdbRating={movie.data.imdbRating}
            imdbVotes={movie.data.imdbVotes}
            Language={movie.data.Language}
            Metascore={movie.data.Metascore}
            Plot={movie.data.Plot}
            Poster={movie.data.Poster}
            Production={movie.data.Production}
            Rated={movie.data.Rated}
            Released={movie.data.Released}
            Response={movie.data.Response}
            Runtime={movie.data.Runtime}
            Title={movie.data.Title}
            Type={movie.data.Type}
            Website={movie.data.Website}
            Writer={movie.data.Writer}
            Year={movie.data.Year}
            Ratings={movie.data.Ratings}
          >
            {movie.data.imdbID && (
              <Button
                mt={3}
                leftIcon={<StarIcon />}
                colorScheme="yellow"
                variant="solid"
                onClick={() => handleFavorite(movie.data.imdbID)}
              >
                Add to favorite
              </Button>
            )}
          </Film>
        </SimpleGrid>
      )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { imdbID } = context.params

  const response = await apiAuthClient.get(
    `${process.env.NEXT_PUBLIC_API}/movies-by-imdb-id/${imdbID}`,
  )

  return {
    props: {
      movie: response.data,
    },
    revalidate: 60 * 60,
  }
}
