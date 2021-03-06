/* eslint-disable react-hooks/exhaustive-deps */
import { VFC, memo, useCallback, useEffect } from 'react';
import { Flex, Heading, Link, Box, useDisclosure } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';

import { MenuIconButoon } from '../../atoms/button/MenuIconButton';
import { MenuDrawer } from '../../molecules/MenuDrawer';
import { useLogout } from '../../../hooks/useLogout';
import { userState } from '../../../store/userState';


export const Header: VFC = memo( () => {

  const [ userInfo, setUserInfo ] = useRecoilState(userState);

  const history = useHistory();
  const { isOpen, onOpen, onClose} = useDisclosure();
  const { logout } = useLogout();

  const onClickHome = useCallback( () => {
    history.push("/home")
    onClose();
  }, []);
  const onClickUserInfo = useCallback( () => history.push("/user"), []);
  const onClickArchive = useCallback( () => {
    history.push("/archive");
    onClose();
  }, []);
  const onClickSignOut = useCallback( () =>  {
    logout();
    history.push("/")
  }, []);

  useEffect( () => {
    const uname : string = Cookies.get("uname") ?? "ユーザー";
    setUserInfo( uname );
  },[])

  return(
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{ base: 2, md: 4 }}>
        <Link to="/user" fontSize={{base: "sm", md: "md"}} onClick={onClickUserInfo}>{userInfo}</Link>
        <Flex as="a" _hover={{cursor: "pointer"}}　onClick={onClickHome}>
          <Heading as="h1" fontWeight="200">MyDictionary</Heading>
        </Flex>
        <Flex align="center" fontSize="md" display={{ base: "none", md: "flex"}}>
          <Box pr={3}>
            <Link onClick={onClickArchive}>アーカイブ</Link>
          </Box>
          <Link onClick={onClickSignOut}>ログアウト</Link>
        </Flex>
        <MenuIconButoon onOpen={onOpen} />
      </Flex>
      <MenuDrawer isOpen={isOpen} onClose={onClose} onClickHome={onClickHome} onClickArchive={onClickArchive} onClickSignOut={onClickSignOut} />
    </>
  );
})
