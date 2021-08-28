import { VFC, memo, useEffect, useCallback } from 'react';
import { useDisclosure, Grid, GridItem, Box, Button, Flex } from '@chakra-ui/react';

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
      templateRows={{base: "repeat(1, 1fr)" ,md: "repeat(1, 1fr)"}}
      p={4}
    >
      <GridItem display={{base: "none", md: "inline-grid"}} bg="papayawhip" h={{base: "0", md: "10vh"}} >
        <Flex justifyContent="center" textAlign="center" flexDirection="column">
          <Box>
            <Button>単語を追加</Button>
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <WordCardList loading={loading} wordList={wordList} onClickWord={onClickWord} />
      </GridItem>
      <AddWordIcon onClick={onClickAddWord} />
    </Grid>
      <WordDetailModal mode="default" isOpen={isOpenWord} onClose={onCloseWord} word={selectedWord} />
      <AddWordModal isOpen={isOpenAdd} onClose={onCloseAdd} />
    </>
  );

});
