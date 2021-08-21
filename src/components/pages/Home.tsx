import { VFC, memo, useEffect, useCallback } from 'react';
import {  useDisclosure, Grid, GridItem } from '@chakra-ui/react';

import { useWordList } from '../../hooks/useWordList';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';
import { WordCardList } from '../templates/WordCardList';

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
      templateColumns={{base: "repeat(1, 1fr)" ,md: "repeat(7, 1fr)"}}
    >
      <GridItem colSpan={5}>
        <WordCardList loading={loading} wordList={wordList} onClickWord={onClickWord} />
      </GridItem>
      <GridItem colSpan={2} bg="papayawhip" h={{base: 0, md: "100vh"}}>
      </GridItem>
    </Grid>
      <WordDetailModal isOpen={isOpen} onClose={onClose} word={selectedWord} />
      </>
  );

});
