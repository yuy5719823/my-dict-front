import { VFC, memo, useEffect, useCallback, useState } from 'react';
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

  // 強制的に再レンダリング
  const [ update, setUpdate ] = useState<boolean>(false);

  const onClickWord = useCallback( (id: number) => {
    setWord({id, wordList})
    onOpenWord();
  }, [wordList, onOpenWord, setWord])

  const onClickAddWord = useCallback( () => {
    onOpenAdd();
  }, [onOpenAdd])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => fetchWordList() ,[update] );

  return(
    <>
    <Grid
      templateRows={{base: "repeat(1, 1fr)" ,md: "repeat(1, 1fr)"}}
      p={4}
    >
      <GridItem display={{base: "none", md: "inline-grid"}} h={{base: "0", md: "10vh"}} >
        <Flex justifyContent="center" textAlign="center" flexDirection="column">
          <Box>
            <Button onClick={onClickAddWord} bg="green.200" shadow="md" fontWeight="bold" _hover={{}}>単語を追加</Button>
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <WordCardList loading={loading} wordList={wordList} onClickWord={onClickWord} />
      </GridItem>
      <AddWordIcon onClick={onClickAddWord} />
    </Grid>
      <WordDetailModal mode="default" isOpen={isOpenWord} onClose={onCloseWord} word={selectedWord} update={update} setUpdate={setUpdate} />
      <AddWordModal isOpen={isOpenAdd} onClose={onCloseAdd} update={update} setUpdate={setUpdate} />
    </>
  );

});
