import { VFC, memo, useState, ChangeEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody} from '@chakra-ui/react';
import { useSignUp } from '../../../hooks/useSignUp';
import { UserSettingForm } from './UserSettingForm';

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
          <UserSettingForm userName={userName} onChangeUserName={onChangeUserName} email={email} onChangeEmail={onChangeEmail} password={password} onChangePassword={onChangePassword} passwordConfirmation={passwordConfirmation} onChangePasswordConfirmation={onChangePasswordConfirmation} onClick={onClickSignUp} buttonColor={"blue.300"} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
})
