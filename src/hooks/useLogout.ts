import axios from 'axios';
import { signOutUrl } from '../urls';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useMessage } from './useMessage';

export const useLogout = () => {

  const { showMessage } = useMessage();

  const logout = useCallback( () => {
    axios.delete(signOutUrl, { headers: {
      "access-token": Cookies.get("accessToken"),
      "client": Cookies.get("client"),
      "uid": Cookies.get("uid") 
    }})
    .then( () => {
      //Cookieの値を削除
      Cookies.remove("accessToken");
      Cookies.remove("client");
      Cookies.remove("expiry");
      Cookies.remove("uid");
      showMessage({title: "ログアウトしました", status: "success"})
    } )
    .catch( () => 
      showMessage({title: "ログアウトに失敗しました", status: "warning"})
    )
  }, [showMessage])

  return { logout }
}
