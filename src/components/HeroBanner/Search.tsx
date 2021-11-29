import { Box, Button, Flex, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../Form/Input'
import { apiAuthClient } from '../../attachment/Auth/services/apiAuthClient'

export function Search({ setFilms }): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()
  const toast = useToast()

  async function handleSearch(dataSubmit) {
    setIsLoading(true)
    const { film } = dataSubmit
    // localStorage.setItem('@marvel-next:email', email)
    const films = await apiAuthClient.get(
      `./movies-list-get-title-contains/${film}`,
    )
    const { data } = films
    setFilms(data)
    // const { error, message } = sendSubscribe.data
    // if (error) {
    //   toast({
    //     title: 'Subscription',
    //     description: message,
    //     status: 'error',
    //     duration: 9000,
    //     isClosable: true,
    //     position: 'top-right',
    //   })
    // } else {
    //   toast({
    //     title: 'Subscription',
    //     description: message,
    //     status: 'success',
    //     duration: 9000,
    //     isClosable: true,
    //     position: 'top-right',
    //   })
    // }
    // setIsLoading(false)
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleSearch)} w="100%">
      <Flex align="center">
        <Input
          name="film"
          error={errors.film}
          {...register('film')}
          placeholder="Enter the title of the movie you want to search"
        />
        <Button
          ml={3}
          type="submit"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Search
        </Button>
      </Flex>
    </Box>
  )
}
