import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { wordType } from '../types/api/wordType';
import { getArchiveWordUrl, getWordsUrl } from '../urls/index';
import { useMessage } from './useMessage';

type Props = {
  mode: "default" | "archive";
}


export const useWordList = () => {

  const history = useHistory();
  const {showMessage} = useMessage();

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ wordList, setWordList ] = useState<Array<wordType>>([]);

  const fetchWordList = useCallback((props: Props) => {

    //modeによって取得するデータを変更
    const { mode } = props;
    let wordUrl: string = "";
    mode === "default" ? wordUrl = getWordsUrl : wordUrl = getArchiveWordUrl;

    setLoading(true);
    axios.get<Array<wordType>>(wordUrl, {
      headers: {
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
