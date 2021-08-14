import { VFC, memo } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { wordType } from '../../types/api/wordType';
import { getWordsUrl } from '../../urls/index';

export const Home: VFC = memo(() => {


  useEffect( () =>{
    axios.get<wordType>(getWordsUrl, {
      params: {
        "access-token": Cookies.get("accessToken"),
        client: Cookies.get("client"),
        expiry: Cookies.get("expiry"),
        uid: Cookies.get("uid"),
      }
    }).then( (res) => {
      console.log(res);
      alert("データの取得に成功しました");
    })
    .catch( () =>
      alert("データの取得に失敗しました")
    );
  },[] );



  return(
    <p>ホームページです</p>
  );

});
