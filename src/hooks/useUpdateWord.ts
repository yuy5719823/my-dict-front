
import { useCallback } from 'react';
import axios from 'axios';
import { editWordUrl } from '../urls';
import Cookies from 'js-cookie';
import { useMessage } from './useMessage';

type Props = {
  id: number;
  wordData: {word: string, memo: string, archive: boolean};
}

export const useUpdateWord = () => {

  const { showMessage } = useMessage();

  const updateWord = useCallback((props: Props) => {
    const { id, wordData } = props;
    axios({
      method: "patch",
      url: editWordUrl(id),
      data: { word: {
        word: wordData.word,
        memo: wordData.memo,
        archive: true,
      }},
      params: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
      }
    })
    .then( () => {
      showMessage({title: "更新しました", status: "success" })
    })
    .catch( () => 
    showMessage({title: "更新に失敗しました", status: "error" })
    )
  }, [showMessage]);

  return { updateWord }
}
