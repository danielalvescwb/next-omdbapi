import { ReactNode } from 'react'
import {
  Box,
  Flex,
  Grid,
  Center,
  Badge,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { H1 } from './h1'
import { H4 } from './h4'

interface IRatings {
  id: number
  Source: string
  Value: string
  movieId: number
}
export interface IMovie {
  id?: number
  Actors: string
  Awards: string
  BoxOffice: string
  Country: string
  Director: string
  DVD: string
  Genre: string
  imdbID: string
  imdbRating: string
  imdbVotes: string
  Language: string
  Metascore: string
  Plot: string
  Poster: string
  Production: string
  Rated: string
  Released: string
  Response: string
  Runtime: string
  Title: string
  Type: string
  Website: string
  Writer: string
  Year: string
  Ratings: IRatings[]
  children?: ReactNode
}
export interface IMovieRequest {
  resource: string
  data: IMovie
  totalResults: number
}

export function Film({
  Actors,
  Awards,
  BoxOffice,
  Country,
  Director,
  DVD,
  Genre,
  imdbID,
  imdbRating,
  imdbVotes,
  Language,
  Metascore,
  Plot,
  Poster,
  Production,
  Rated,
  Released,
  Response,
  Runtime,
  Title,
  Type,
  Website,
  Writer,
  Year,
  Ratings,
  children,
}: IMovie) {
  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderColor="purple.700"
      borderRadius="sm"
      overflow="hidden"
      bgColor="gray.100"
      backgroundImage={Poster === 'N/A' ? '/imbNotFound.png' : Poster}
      backgroundRepeat="no-repeat"
      backgroundSize={'cover'}
      minW="100%"
    >
      <Grid
        templateColumns={useBreakpointValue({
          base: '1fr',
          md: 'minmax(150px, 450px) minmax(50%, 100%)',
        })}
        backdropFilter="blur(50px)"
        minH="100%"
      >
        <Center d="flex" alignItems="center" p={4} minW="150px" maxW="450px">
          <Image
            src={Poster === 'N/A' ? '/imbNotFound.png' : Poster}
            alt={Title}
            width="450px"
            height="750px"
          />
        </Center>
        <Flex
          direction="column"
          justify="space-between"
          pr={8}
          pb={8}
          pl={8}
          bgColor="gray.800"
          opacity="0.7"
        >
          <Box>
            {Title && <H1>{Title}</H1>}
            {Plot && Plot !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Plot:
                </Text>
                {` ${Plot}`}
              </H4>
            )}
            {Released && Released !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Released:
                </Text>
                {` ${Released}`}
              </H4>
            )}
            {Type && Type !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  <Badge borderRadius="full" px="2" colorScheme="gray">
                    Type
                  </Badge>
                </Text>
                {` ${Type}`}
              </H4>
            )}
            {Genre && Genre !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Genre:
                </Text>
                {` ${Genre}`}
              </H4>
            )}
            {Year && Year !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Year:
                </Text>
                {` ${Year}`}
              </H4>
            )}
            {Rated && Rated !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Rated:
                </Text>
                {` ${Rated}`}
              </H4>
            )}
            {Runtime && Runtime !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Runtime:
                </Text>
                {` ${Runtime}`}
              </H4>
            )}
            {Director && Director !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Director:
                </Text>
                {` ${Director}`}
              </H4>
            )}
            {Writer && Writer !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Writer:
                </Text>
                {` ${Writer}`}
              </H4>
            )}
            {Actors && Actors !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Actors:
                </Text>
                {` ${Actors}`}
              </H4>
            )}
            {Language && Language !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Language:
                </Text>
                {` ${Language}`}
              </H4>
            )}
            {Country && Country !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Country:
                </Text>
                {` ${Country}`}
              </H4>
            )}
            {Awards && Awards !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Awards:
                </Text>
                {` ${Awards}`}
              </H4>
            )}
            {Ratings && Ratings.length > 0 && (
              <>
                <Text color="gray.400" fontWeight="extrabold">
                  Ratings:
                </Text>
                {Ratings.map(({ id, Source, Value }) => (
                  <H4 key={`Ratings-${id}`}>
                    <Text as="span" fontWeight="extrabold">
                      <Badge borderRadius="full" px="2" colorScheme="gray">
                        {Source}
                      </Badge>
                    </Text>
                    {` ${Value}`}
                  </H4>
                ))}
              </>
            )}
            {Metascore && Metascore !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Metascore:
                </Text>
                {` ${Metascore}`}
              </H4>
            )}
            {imdbRating && imdbRating !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  imdbRating:
                </Text>
                {` ${imdbRating}`}
              </H4>
            )}
            {DVD && DVD !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  DVD:
                </Text>
                {` ${DVD}`}
              </H4>
            )}
            {BoxOffice && BoxOffice !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  BoxOffice:
                </Text>
                {` ${BoxOffice}`}
              </H4>
            )}
            {Production && Production !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Production:
                </Text>
                {` ${Production}`}
              </H4>
            )}
            {Website && Website !== 'N/A' && (
              <H4>
                <Text as="span" fontWeight="extrabold">
                  Website:
                </Text>
                {` ${Website}`}
              </H4>
            )}
          </Box>
          {children}
        </Flex>
      </Grid>
    </Box>
  )
}
