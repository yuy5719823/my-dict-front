import { useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { updateUserInfoUrl } from '../urls/index';

type UserInfo = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string
}

export const useUserSetting = () => {

  const updateUserInfo = useCallback( (userInfo: UserInfo) => {

    const { userName, email, password, passwordConfirmation} = userInfo;

    axios.put(updateUserInfoUrl,
      {name: userName, email},
      {
      headers: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
        }
      })
      .then( (res) => {
        console.log(res)
        Cookies.set("uname", res.data.data.name);
        alert("更新成功");
      })
      .catch( () => {
        alert("更新失敗");
      })
  }, [])

  const deleteUser = useCallback( () => {}, [])

  return { updateUserInfo, deleteUser }
}
