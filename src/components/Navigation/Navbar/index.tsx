import { ReactNode, useContext } from 'react'
import LinkNext from 'next/link'
import {
  Box,
  Flex,
  Avatar,
  AvatarBadge,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { AuthContext } from '../../../attachment/Auth/contexts/AuthContext'
import Router from 'next/router'

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export default function Nav() {
  const { user, isAuthenticated, signOut, setUser } = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleSignIn() {
    Router.push(
      'https://github.com/login/oauth/authorize?client_id=2f368b501559eea98f81',
    )
  }
  function handleSignOut() {
    setUser(null)
    signOut()
  }

  function handleFavorites() {
    Router.push('/favorites')
  }

  return (
    <>
      <Box px={4} position="fixed" zIndex="1">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  {isAuthenticated ? (
                    <Avatar size={'sm'} src={user.avatar_url} />
                  ) : (
                    <Avatar size="sm">
                      <AvatarBadge
                        borderColor="papayawhip"
                        bg="tomato"
                        boxSize="1.25em"
                      />
                    </Avatar>
                  )}
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    {isAuthenticated ? (
                      <Avatar size="2xl" src={user.avatar_url} />
                    ) : (
                      <Avatar size="2xl">
                        <AvatarBadge
                          borderColor="papayawhip"
                          bg="tomato"
                          boxSize="1.25em"
                        />
                      </Avatar>
                    )}
                  </Center>
                  <br />
                  <Center>{isAuthenticated ? user.name : 'Username'}</Center>
                  <br />
                  <MenuDivider />
                  {isAuthenticated && <MenuItem>{user.email}</MenuItem>}
                  {isAuthenticated && (
                    <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
                  )}
                  {isAuthenticated ? (
                    <MenuItem onClick={handleSignOut}>sign Out</MenuItem>
                  ) : (
                    <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
                  )}
                </MenuList>
              </Menu>
              <Button
                onClick={toggleColorMode}
                colorScheme={colorMode === 'light' ? 'blackAlpha' : 'yellow'}
              >
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
