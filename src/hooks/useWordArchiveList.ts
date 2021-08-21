import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { wordType } from '../types/api/wordType';
import { getArchiveWordUrl } from '../urls/index';
import { useMessage } from './useMessage';


export const useArchiveWordList = () => {

  const history = useHistory();
  const {showMessage} = useMessage();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ archiveWordList, setArchiveWordList ] = useState<Array<wordType>>([]);

  const fetchWordList = useCallback(() => {
    setLoading(true);
    axios.get<Array<wordType>>(getArchiveWordUrl, {
      params: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
      }
    }).then( (res) => {
      setArchiveWordList(res.data);
      // showMessage({title: "データの取得に成功しました", status: "success"});
    })
    .catch( () =>{
      showMessage({title: "データの取得に失敗しました", status: "error"});
      history.push("/home");
    })
    .finally( () => setLoading(false) );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { fetchWordList, loading, archiveWordList }
}
