import { VFC, memo, ChangeEvent } from 'react';
import { Box, Stack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { PasswordInputConfirm } from '../../atoms/password/PasswordInputConfirm';
import { PrimaryButton } from '../../atoms/button/PrimaryButton';

type Props = {
  userName: string;
  onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordConfirmation: string;
  onChangePasswordConfirmation: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  buttonColor?: string;
  disabled?: boolean
  buttonTitle: string;
}

export const UserSettingForm:VFC<Props> = memo((props) => {

  const { userName, onChangeUserName, email, onChangeEmail, password, onChangePassword, passwordConfirmation, onChangePasswordConfirmation, onClick, buttonColor, disabled=false, buttonTitle} = props;

  return(
    <Box>
    <Stack py={2}>
      <FormControl>
        <FormLabel>ユーザーネーム</FormLabel>
        <Input value={userName} placeholder="ユーザーネーム" onChange={onChangeUserName}  autoComplete="name"/>
      </FormControl>
      <FormControl>
        <FormLabel>メールアドレス</FormLabel>
        <Input value={email} placeholder="メールアドレス" onChange={onChangeEmail} disabled={disabled} autoComplete="email" />
      </FormControl>
      <FormControl>
        <FormLabel id="password">パスワード</FormLabel>
        <form>
        <PasswordInputConfirm setPlaceholder="パスワード(6文字以上)" setInput={password} onChange={onChangePassword} />
        </form>
      </FormControl>
      <FormControl pb={6}>
        <FormLabel id="password-confirmation">パスワード(確認)</FormLabel>
        <form>
        <PasswordInputConfirm setPlaceholder="パスワード(確認)" setInput={passwordConfirmation} onChange={onChangePasswordConfirmation}/>
        </form>
      </FormControl>
      <PrimaryButton onClick={onClick} loading={false} buttonColor={buttonColor} disabled={email === "test0@example.com"}>{buttonTitle}</PrimaryButton>
    </Stack>
  </Box>
  );
})
