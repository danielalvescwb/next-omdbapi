import { Box, Button, Flex, Grid, Center, Badge } from '@chakra-ui/react'
import Image from 'next/image'

export function FilmItem({ Poster, Title, Year, imdbID, Type }) {
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
      <Grid templateColumns="150px 1fr" backdropFilter="blur(20px)" minH="100%">
        <Center d="flex" alignItems="center" p={4} minW="150px" maxW="150px">
          <Image
            src={Poster === 'N/A' ? '/imbNotFound.png' : Poster}
            alt={Title}
            width="150px"
            height="255px"
          />
        </Center>

        <Flex
          direction="column"
          justify="space-between"
          pr={3}
          pb={3}
          pl={3}
          bgColor="gray.800"
          opacity="0.7"
        >
          <Box>
            <Box
              mt="4"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="gray.50"
            >
              {Title}
            </Box>
            <Box
              mt="3"
              mb="3"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              color="gray.400"
            >
              Year: {Year}
            </Box>
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="gray">
                imdbID
              </Badge>
              <Box
                color="gray.300"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {imdbID}
              </Box>
            </Box>
            <Box d="flex" alignItems="baseline" mt={2}>
              <Badge borderRadius="full" px="2" colorScheme="gray">
                Type
              </Badge>
              <Box
                color="gray.300"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {Type}
              </Box>
            </Box>
          </Box>
          <Box d="flex" alignItems="center" mt={5} justifyContent="start">
            <Button
              colorScheme="cyan"
              size="sm"
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/film/${imdbID}`,
                )
              }
            >
              more info
            </Button>
          </Box>
        </Flex>
      </Grid>
    </Box>
  )
}
