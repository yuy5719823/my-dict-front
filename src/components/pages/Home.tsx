import { VFC, memo, useEffect, useCallback } from 'react';
import { useDisclosure, Grid, GridItem } from '@chakra-ui/react';

import { useWordList } from '../../hooks/useWordList';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';
import { WordCardList } from '../templates/WordCardList';
import { AddWordIcon } from '../atoms/button/AddWordButton';
import { AddWordModal } from '../organisms/word/AddWordModal';

export const Home: VFC = memo(() => {

  const { isOpen: isOpenWord, onOpen: onOpenWord, onClose: onCloseWord } = useDisclosure();
  const { fetchWordList, loading, wordList } = useWordList();
  const { setWord, selectedWord } = useSetWord();

  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();

  const onClickWord = useCallback( (id: number) => {
    setWord({id, wordList})
    onOpenWord();
  }, [wordList, onOpenWord, setWord])

  const onClickAddWord = useCallback( () => {
    onOpenAdd();
  }, [onOpenAdd])

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
      <AddWordIcon onClick={onClickAddWord} />
    </Grid>
      <WordDetailModal isOpen={isOpenWord} onClose={onCloseWord} word={selectedWord} />
      <AddWordModal isOpen={isOpenAdd} onClose={onCloseAdd} />
    </>
  );

});
