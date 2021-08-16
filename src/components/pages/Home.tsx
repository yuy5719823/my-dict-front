import { VFC, memo, useEffect } from 'react';
import { Spinner, Center, Wrap, WrapItem } from '@chakra-ui/react';



import { useWordList } from '../../hooks/useWordList';
import { WordCard } from '../organisms/WordCard';

export const Home: VFC = memo(() => {

  const { fetchWordList, loading, wordList } = useWordList();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => fetchWordList() ,[] );

  return(
    <>
      {loading === true ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{base: 4, md: 10 }} justify={{base: "center", md: "left"}} direction="column" spacing="30px" >
            {wordList.map( (word) => (
              <WrapItem key={word.id}>
                <WordCard title={word.word} wordMemo={word.memo} />
              </WrapItem>
            ))}
            <WordCard title="タイトル" wordMemo="メモ" />
        </Wrap>
      )}
      </>
  );

});
