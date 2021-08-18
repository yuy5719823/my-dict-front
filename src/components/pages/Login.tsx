import { VFC, memo, useState, ChangeEvent } from 'react';
import { Input, Flex, Box, Heading, Divider, Stack, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, Button, ModalCloseButton, ModalBody, FormControl, FormLabel } from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { userInfoType } from '../../types/api/userInfoType';


export const Login: VFC = memo(() => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { login, loading } = useAuth();
  const [userInfo, setUserInfo] =useState<userInfoType>({ email: "test0@example.com", password: "password" });

  const onClickLogin = () => login(userInfo);
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, email: event.target.value});
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, password: event.target.value});

  const onClickSignUp = () => alert("新規登録");

  return(
    <>
      <Flex align="center" justify="center" height="100vh" flexDirection="column">
        <Box bg="white" w="sm" p={4} borderRadius={8} shadow="md">
          <Heading as="h1" size="lg" textAlign="center" fontWeight="light" color="gray.600">MyDictionary</Heading>
          <Divider　my={2} />
          <Stack spacing={4} py={3} px={8} >
            <Input value={userInfo.email} onChange={onChangeEmail} type="email" placeholder="メールアドレスを入力" />
            <Input value={userInfo.password} onChange={onChangePassword} type="password" placeholder="パスワードを入力" />
            <PrimaryButton onClick={onClickLogin} loading={loading}>ログイン</PrimaryButton>
          </Stack>
        </Box>
      <Box py={8}>
        <Button fontSize="sm" color="gray.500" borderBottom="solid 2px white" _hover={{ backgroundColor: "gray.50" }} p={1} borderRadius={8} onClick={onOpen}>
          アカウントの作成
        </Button>
      </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent p={6}>
          <ModalHeader as="h2" fontWeight="medium" textAlign="center">アカウントの作成</ModalHeader>
          <ModalCloseButton _hover={{opacity: "none"}} />
          <ModalBody pt={6} flexDirection="column">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>ユーザーネーム</FormLabel>
                <Input placeholder="ユーザーネーム" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" placeholder="sample@example.com" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input type="password" placeholder="パスワード" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>パスワード(確認)</FormLabel>
                <Input type="password" placeholder="ユーザーネーム" />
              </FormControl>
              <Button　w="100%">新規登録</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

});
