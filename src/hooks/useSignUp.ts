import { useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';


import { signUpUrl } from '../urls/index';
import { useMessage } from './useMessage'

type Props = {
    userName: string;
    email: string
    password: string;
    passwordConfirmation: string;
}

export const useSignUp = () => {

  const { showMessage } = useMessage();
  const history = useHistory();

  const signUp = useCallback( (props: Props) => {

    const { userName, email, password, passwordConfirmation } = props;

    axios.post(signUpUrl, {userName, email, password, passwordConfirmation})
    .then( (res) => {
      Cookies.set("accessToken", res.headers["access-token"]);
      Cookies.set("client", res.headers.client );
      Cookies.set("expiry", res.headers.expiry);
      Cookies.set("uid", res.headers.uid);
      history.push("/home");
      showMessage({title: "ユーザー登録完了", status: "success"});
    })
    .catch( () => {
      showMessage({title: "ユーザー登録の登録に失敗しました", status: "error"})
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return { signUp }

}
