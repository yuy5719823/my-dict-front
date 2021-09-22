import { Box, Heading, Flex } from '@chakra-ui/react';
import { VFC, memo, useEffect, useState, ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';


import { useUserSetting } from '../../hooks/useUserSetting';
import { UserSettingForm } from '../organisms/user/UserSettingForm';
import { DeleteAccountFunction } from '../molecules/DeleteAccountFunction';
import { userState } from '../../store/userState';

export const User: VFC = memo(() => {

  const setUserInfo = useSetRecoilState(userState);
  const { updateUserInfo, deleteUser } = useUserSetting();

  const [ userName, setUserName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("");

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value);

  const onClickUpdate = () => {
    updateUserInfo({userName, email, password, passwordConfirmation});
    setUserInfo( Cookies.get("uname")! );
  };
  
  useEffect( () => {
    const uname = Cookies.get("uname");
    const uemail = Cookies.get("uid");
    setUserName(uname!);
    setEmail(uemail!);
  },[])


  return(
    <Flex height={{base: "40em" ,md:"90vh"}} align="center" flexDirection="column" justify="center">
      <Box bg="white" w={{base:"auto",sm: "md", md: "xl"}} textAlign="center" p={{base: 8, md: 6}} borderRadius={8} >
        <Heading as="h2" textAlign="center" fontSize="x-large" fontWeight="light" >ユーザー情報</Heading>
        <UserSettingForm userName={userName} onChangeUserName={onChangeUserName} email={email} onChangeEmail={onChangeEmail} password={password} onChangePassword={onChangePassword} passwordConfirmation={passwordConfirmation} onChangePasswordConfirmation={onChangePasswordConfirmation} onClick={onClickUpdate} disabled={true} buttonTitle="更新する" />
      </Box>
      <Box py={8}> 
        <DeleteAccountFunction deleteUser={deleteUser} isTestUser={email === "guest@example.com"} />
      </Box>
    </Flex>
  );

});
