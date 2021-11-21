import { useState, useEffect } from 'react'
import { Text, SimpleGrid } from '@chakra-ui/react'
import { GitHubCorner } from '../components/GitHubCorner'
import { HeroBanner } from '../components/HeroBanner'
import { SEO } from '../components/SEO'
import { FilmItem } from '../components/Films/FilmItem'

import dynamic from 'next/dynamic'

const WithSubnavigation = dynamic(import('../components/Navigation/Navbar/'), {
  ssr: false,
})

interface IFilmes {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}
interface IResponse {
  resource: string
  data: IFilmes[]
  totalResults: number
}

export default function Home() {
  const title = 'Filmes'
  const description = 'Search your favorite movie in OMDb API'
  const [films, setFilms] = useState<IResponse>()
  const [isFilms, setIsFilms] = useState<boolean>(false)
  useEffect(() => {
    setIsFilms(!!films)
  }, [films])
  return (
    <>
      <SEO
        title={title}
        description={description}
        image="backgound_share.jpg"
      />
      <WithSubnavigation />
      <GitHubCorner projectUrl="https://github.com/danielalvescwb/next-omdbapi" />
      <HeroBanner setFilms={setFilms} isFilms={isFilms} />
      {films && (
        <>
          <Text textAlign="center" fontSize="3xl" color="purple.100" mt={3}>
            {films.totalResults} titles found
          </Text>
          <SimpleGrid
            minChildWidth={{ base: '300px', md: '400px', lg: '400px' }}
            spacing={4}
            p={5}
            mb={30}
          >
            {films.data.map(({ imdbID, Poster, Title, Type, Year, id }) => (
              <FilmItem
                key={id}
                Poster={Poster}
                Title={Title}
                Type={Type}
                Year={Year}
                imdbID={imdbID}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
