import { useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { deleteUserUrl, updateUserInfoUrl } from '../urls/index';
import { useMessage } from './useMessage';
import { useHistory } from 'react-router-dom';

type UserInfo = {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string
}

export const useUserSetting = () => {

  const { showMessage } = useMessage();
  const history = useHistory();

  const updateUserInfo = useCallback( (userInfo: UserInfo) => {

    const { userName, email, password, passwordConfirmation} = userInfo;

    axios.patch(updateUserInfoUrl,
      {name: userName, email, password, password_confirmation: passwordConfirmation},
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
        showMessage({title: "更新しました", status: "success"})
      })
      .catch( () => {
        showMessage({title: "更新に失敗しました", status: "error"})
      })
  }, [showMessage])

  const deleteUser = useCallback( () => {
    axios.delete(deleteUserUrl, {
      headers: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
        }
      })
      .then( () => {
        showMessage({title: "アカウントを削除しました", status: "success"})
        history.push("/");
      })
      .catch(() => showMessage({title: "アカウントの削除に失敗しました", status: "error"}))
  }, [showMessage,history])

  return { updateUserInfo, deleteUser }
}
