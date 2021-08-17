import { VFC, memo, useEffect, useCallback } from 'react';
import { Spinner, Center, Wrap, WrapItem, useDisclosure, Grid, GridItem, Button, Text } from '@chakra-ui/react';

import { useWordList } from '../../hooks/useWordList';
import { WordCard } from '../organisms/word/WordCard';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';

export const Home: VFC = memo(() => {

  const { isOpen, onOpen, onClose} = useDisclosure();
  const { fetchWordList, loading, wordList } = useWordList();
  const { setWord, selectedWord } = useSetWord();

  const onClickWord = useCallback( (id: number) => {
    setWord({id, wordList})
    onOpen();
  }, [wordList, onOpen, setWord])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => fetchWordList() ,[] );

  return(
    <>
    <Grid
      templateColumns={{base: "repeat(1, 1fr)" ,md: "repeat(2, 1fr)"}}
    >
      <GridItem colSpan={1}>
      {loading === true ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{base: 4, md: 10 }} mx={{base:0, md:20}} justify="center" direction="column" spacing="30px" >
          {wordList.length === 0 ? (
            <WrapItem>
              <WordCard id={0} title="タイトル" wordMemo="メモ" onClick={onClickWord} />
            </WrapItem>
          ) : (
            <>
            {wordList.map( (word) => (
              <WrapItem key={word.id}>
                <WordCard id={word.id} title={word.word} wordMemo={word.memo} onClick={onClickWord} />
              </WrapItem>
            ))}
            </>
          ) }
        </Wrap>
      )}
      </GridItem>
      <GridItem colSpan={1} bg="papayawhip">
      </GridItem>
    </Grid>
      <WordDetailModal isOpen={isOpen} onClose={onClose} word={selectedWord} />
      </>
  );

});
