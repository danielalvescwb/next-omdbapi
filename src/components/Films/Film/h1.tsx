import { Box, Divider } from '@chakra-ui/react'

export function H1({ children }) {
  return (
    <>
      <Box
        as="h1"
        my={4}
        fontWeight="bold"
        fontSize={32}
        lineHeight="tight"
        color="gray.50"
      >
        {children}
      </Box>
      <Divider />
    </>
  )
}
