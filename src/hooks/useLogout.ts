import axios from 'axios';
import { signOutUrl } from '../urls';
import Cookies from 'js-cookie';

export const useLogout = () => {

  const logout = () => {
    axios.delete(signOutUrl, { headers: {
      "access-token": Cookies.get("accessToken"),
      "client": Cookies.get("client"),
      "uid": Cookies.get("uid") 
    }})
    .then( () => {
      //Cookieの値を削除
      Cookies.remove("client");
      Cookies.remove("accessToken");
      Cookies.remove("uid");
      alert("ログアウトしました");
    } )
    .catch( () => 
      alert("ログアウトに失敗しました")
    )
  }

  return { logout }
}
