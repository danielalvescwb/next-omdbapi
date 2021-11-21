import {
  Box,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { Search } from './Search'
export function HeroBanner({ setFilms, isFilms }) {
  return (
    <Flex
      w={'full'}
      h={isFilms ? '60vh' : '100vh'}
      backgroundImage={'url(./bg.jpg)'}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      transition="1s"
    >
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
      >
        <Stack
          maxW={'max'}
          align={'flex-start'}
          spacing={6}
          p={18}
          bgColor="rgba(255, 190, 255, 0.15)"
          backdropFilter="blur(5px)"
          borderRadius="md"
        >
          <Text
            color="purple.100"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
          >
            Search your favorite movie in OMDb API
          </Text>
          <Search setFilms={setFilms} />
        </Stack>
      </VStack>
      <Box
        w="100%"
        position="fixed"
        color={'gray.400'}
        textAlign="right"
        zIndex="2"
        p="10px"
        bgColor="gray.800"
        bottom="0"
      >
        P.S. this site is for testing purposes only, the information is taken
        from the
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://developer.marvel.com"
        >
          developer.marvel.com
        </a>
      </Box>
    </Flex>
  )
}
