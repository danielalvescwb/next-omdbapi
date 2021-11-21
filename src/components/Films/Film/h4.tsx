import { Box } from '@chakra-ui/react'

export function H4({ children }) {
  return (
    <Box
      mt="3"
      mb="3"
      as="h4"
      lineHeight="tight"
      color="gray.400"
      textAlign="justify"
    >
      {children}
    </Box>
  )
}
