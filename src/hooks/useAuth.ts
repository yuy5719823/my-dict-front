import { useCallback, useState } from 'react';
import axios from "axios"
import Cookies from 'js-cookie';

import { signInUrl } from '../urls';
import { useHistory } from 'react-router-dom';
import { userInfoType } from '../types/api/userInfoType';
import { useMessage } from './useMessage';

export const useAuth = () => {

  const history = useHistory();
  const [ loading, setLoading ] = useState(false);
  const { showMessage } = useMessage();

  const login = useCallback((userInfo: userInfoType ) => {
    setLoading(true);
    axios.post(signInUrl, userInfo)
    .then( (res) => {
      // console.log(res)
      //Cookieに情報を保存
      Cookies.set("accessToken", res.headers["access-token"]);
      Cookies.set("client", res.headers.client );
      Cookies.set("expiry", res.headers.expiry);
      Cookies.set("uid", res.headers.uid);
      history.push("/home");
      showMessage({title: "ログインしました", status: "success"})
    }).catch( () => {
      setLoading(false);
      showMessage({title: "ログインに失敗しました", status: "warning"})
    })
  }, [history, showMessage]);

  return { login, loading }

}
