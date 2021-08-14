import { VFC, memo, useState, ChangeEvent } from 'react';
import { Input, Flex, Box, Heading, Divider, Link, Stack } from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { userInfoType } from '../../types/api/userInfoType';


export const Login: VFC = memo(() => {

  const { login, loading } = useAuth();
  const [userInfo, setUserInfo] =useState<userInfoType>({ email: "test@example.com", password: "password" });

  const onClickLogin = () => login(userInfo);
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, email: event.target.value});
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, password: event.target.value});

  return(
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
      <Link color="gray.500" borderBottom="solid 2px white" _hover={{ backgroundColor: "gray.50" }} p={1} borderRadius={8}>
        アカウントの作成
      </Link>
    </Box>
    </Flex>
  );

});