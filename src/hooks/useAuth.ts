import { useCallback, useState } from 'react';
import axios from "axios"
import Cookies from 'js-cookie';

import { loginUrl } from '../urls';
import { useHistory } from 'react-router-dom';
import { userInfoType } from '../types/api/userInfo';

export const useAuth = () => {

  const history = useHistory();
  const [ loading, setLoading ] = useState(false);

  const login = useCallback((userInfo: userInfoType ) => {
    setLoading(true);
    axios.post(loginUrl, userInfo)
    .then( (res) => {
      //Cookieに情報を保存
      Cookies.set("client", res.headers.client );
      Cookies.set("accessToken", res.headers["access-token"]);
      Cookies.set("uid", res.headers.uid);
      history.push("/home");
      alert("ログインしました");
    }).catch( () => {
      setLoading(false);
      alert("ログインに失敗しました");
    })
  }, [history]);

  return { login, loading }

}
