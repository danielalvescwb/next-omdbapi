import { Flex, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Film, IMovieRequest } from '../../components/Films/Film'

export default function Movie({ movie }: { movie: IMovieRequest }) {
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
          />
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

  const response = await axios.get(
    `${process.env.NEXT_BASE_URL_API}/movies-by-imdb-id/${imdbID}`,
  )

  return {
    props: {
      movie: response.data,
    },
    revalidate: 60 * 60,
  }
}
