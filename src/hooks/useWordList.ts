import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { wordType } from '../types/api/wordType';
import { getWordsUrl } from '../urls/index';
import { useMessage } from './useMessage';


export const useWordList = () => {

  const history = useHistory();
  const {showMessage} = useMessage();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ wordList, setWordList ] = useState<Array<wordType>>([]);

  const fetchWordList = useCallback(() => {
    setLoading(true);
    axios.get<Array<wordType>>(getWordsUrl, {
      params: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
      }
    }).then( (res) => {
      setWordList(res.data);
      // showMessage({title: "データの取得に成功しました", status: "success"});
    })
    .catch( () =>{
      showMessage({title: "データの取得に失敗しました", status: "warning"});
      history.push("/");
    })
    .finally( () => setLoading(false) );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { fetchWordList, loading, wordList }
}
