import { VFC, memo, useEffect } from 'react';
import { Spinner, Center } from '@chakra-ui/react';



import { useWordList } from '../../hooks/useWordList';

export const Home: VFC = memo(() => {

  const { fetchWordList, loading } = useWordList();


  useEffect( () =>{
    fetchWordList();
  },[fetchWordList] );

  return(
    <>
      {loading === true ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <div></div>
      )}
      </>
  );

});
