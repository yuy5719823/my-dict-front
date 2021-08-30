import { VFC, memo, useEffect, useCallback, useState } from 'react';
import { Center, Spinner, Wrap, WrapItem, Box, useDisclosure } from '@chakra-ui/react';

import { WordCard } from '../organisms/word/WordCard';
import { useWordList } from '../../hooks/useWordList';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';
import { AddWordModal } from '../organisms/word/AddWordModal';

type Props = {
  isOpenAdd?: boolean;
  onCloseAdd?: () => void;
  mode: "default" | "archive";
}

export const WordCardList:VFC<Props> = memo((props) => {

  const { isOpenAdd, onCloseAdd, mode } = props;

  const { fetchWordList, loading, wordList } = useWordList();
  const { isOpen: isOpenWord, onOpen: onOpenWord, onClose: onCloseWord } = useDisclosure();
  const { setWord, selectedWord } = useSetWord();

  const onClickWord = useCallback( (id: number) => {
    setWord({id, wordList})
    onOpenWord();
  }, [wordList, onOpenWord, setWord])

  // 強制的に再レンダリング
  const [ update, setUpdate ] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( () => fetchWordList({mode}) ,[update] );

  return(
    <>
      {loading === true ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{base: 4, md: 8 }} justify="center" direction="column" spacing="30px" >
          {wordList.length === 0 ? (
            <WrapItem  h="90vh">
              <Box m="auto">
                <p>単語が登録されていません</p>
              </Box>
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
      <WordDetailModal mode={mode} isOpen={isOpenWord} onClose={onCloseWord} word={selectedWord} update={update} setUpdate={setUpdate} />
      <AddWordModal isOpen={isOpenAdd ?? false} onClose={onCloseAdd ?? (() => {}) } update={update} setUpdate={setUpdate} />
    </>
  );
})
