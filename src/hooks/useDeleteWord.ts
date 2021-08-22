import { useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { deleteWordUrl } from '../urls';
import { useMessage } from './useMessage';


export const useDeleteWord = () => {

  const { showMessage } = useMessage();

  const deleteWord = useCallback((id: number) => {
    axios.delete(deleteWordUrl(id),{
    headers: {
      "access-token": Cookies.get("accessToken"),
      client: Cookies.get("client"),
      expiry: Cookies.get("expiry"),
      uid: Cookies.get("uid"),
    }})
    .then( () => showMessage({title: "削除しました", status: "success"}))
    .catch( () => showMessage({title: "削除に失敗しました", status: "error" }) )
  }, [showMessage])

  return { deleteWord }

}
