import { useCallback } from 'react';
import axios from 'axios';
import { postWordUrl } from '../urls/index';
import Cookies from 'js-cookie';
import { useMessage } from './useMessage';

type Props = {
  title: string;
  memo: string;
}

export const useAddWord = () => {

  const { showMessage } = useMessage();

  const addWord = useCallback( (props: Props) => {

    const { title, memo } = props;

    axios.post( postWordUrl, {word: {word: title, memo: memo} }, {
      params: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
      }
    } )
    .then( () => {
      showMessage({title: "投稿に成功しました", status: "success"})
    })
    .catch( () => {
      showMessage({title: "投稿に失敗しました", status: "error"})
    })
  }, [showMessage])


  return { addWord }
}
