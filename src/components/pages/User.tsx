import { Box, Heading, FormControl, FormLabel, Input, Stack, Flex, Button } from '@chakra-ui/react';
import { VFC, memo, useEffect, useState, ChangeEvent } from 'react';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import Cookies from 'js-cookie';
import { useUserSetting } from '../../hooks/useUserSetting';

export const User: VFC = memo(() => {

  const { updateUserInfo } = useUserSetting();


  const [ userName, setUserName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("");

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

  const onClickUpdate = () => updateUserInfo({userName, email, password, passwordConfirmation});
  

  useEffect( () => {
    const uname = Cookies.get("uname");
    const uemail = Cookies.get("uid");
    setUserName(uname!);
    setEmail(uemail!);
  },[])


  return(
    <Flex height="90vh" align="center" flexDirection="column" justify="center">
      <Box bg="white" w="xl" textAlign="center" p={{base: 8, md: 6}} borderRadius={8} >
        <Heading as="h2" textAlign="center" fontSize="x-large" fontWeight="light" >ユーザー情報</Heading>
        <Box>
          <Stack py={2}>
            <FormControl>
              <FormLabel>ユーザーネーム</FormLabel>
              <Input value={userName} placeholder="ユーザーネーム" onChange={onChangeUserName} />
            </FormControl>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input value={email} placeholder="メールアドレス" onChange={onChangeEmail} />
            </FormControl>
            <FormControl>
              <FormLabel id="password">パスワード</FormLabel>
              <Input type="password" value={password} placeholder="パスワード"  onChange={onChangePassword} />
            </FormControl>
            <FormControl pb={6}>
              <FormLabel id="password-confirmation">パスワード(確認)</FormLabel>
              <Input type="password" value={passwordConfirmation} placeholder="パスワード(確認)" onChange={onChangePasswordConfirmation} />
            </FormControl>
            <PrimaryButton onClick={onClickUpdate} loading={false}>更新</PrimaryButton>
          </Stack>
        </Box>
      </Box>
      <Box py={8}>
        <Button fontSize="sm" color="gray.500" borderBottom="solid 2px white" _hover={{ backgroundColor: "gray.50" }} p={1} borderRadius={8}>
          アカウントの削除
        </Button>
      </Box>
    </Flex>
  );

});
