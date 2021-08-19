import { VFC, memo, useState, ChangeEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useSignUp } from '../../../hooks/useSignUp';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: VFC<Props> = memo( (props) => {

  const { isOpen, onClose } = props;

  const { signUp } = useSignUp();

  const [ userName, setUserName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState<string>("");

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value); 
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value); 
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value); 
  const onChangePasswordConfirmation = (event: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value);

  const onClickSignUp = () =>{
    signUp({userName, email, password, passwordConfirmation})
  }

  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent p={6}>
        <ModalHeader as="h2" fontWeight="medium" textAlign="center">アカウントの作成</ModalHeader>
        <ModalCloseButton _hover={{opacity: "none"}} />
        <ModalBody pt={6} flexDirection="column">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>ユーザーネーム</FormLabel>
              <Input value={userName} onChange={onChangeUserName} placeholder="ユーザーネーム" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>メールアドレス</FormLabel>
              <Input value={email} onChange={onChangeEmail} type="email" placeholder="sample@example.com" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>パスワード</FormLabel>
              <Input value={password} onChange={onChangePassword} type="password" placeholder="パスワード" />
            </FormControl>
            <FormControl id="password-confirmation">
              <FormLabel>パスワード(確認)</FormLabel>
              <Input value={passwordConfirmation} onChange={onChangePasswordConfirmation} type="password" placeholder="パスワード(確認)" />
            </FormControl>
            <Button backgroundColor="blue.300" color="white" w="100%" onClick={onClickSignUp}>新規登録</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
})
