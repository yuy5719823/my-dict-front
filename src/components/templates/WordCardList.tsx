import { VFC, memo, useEffect, useCallback, useState } from 'react';
import { Center, Spinner, Wrap, WrapItem, Box, useDisclosure } from '@chakra-ui/react';

import { WordCard } from '../organisms/word/WordCard';
import { useWordList } from '../../hooks/useWordList';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';
import { AddWordModal } from '../organisms/word/AddWordModal';
import { SortFunction } from '../organisms/SortFunction';

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

  //ソート機能
  let sortedWordList = wordList;
  const [ sort, setSort ] = useState<string>("");

  switch(sort){
    case "createdAt":
      sortedWordList = wordList.sort((a,b) => b.created_at.localeCompare(a.created_at));
      break;
    case "createdAtDesc":
      sortedWordList = wordList.sort((a,b) => a.created_at.localeCompare(b.created_at));
      break;
    case "name":
      sortedWordList = wordList.sort((a,b) => a.word.localeCompare(b.word));
      break;
    case "nameDesc":
      sortedWordList = wordList.sort((a,b) => b.word.localeCompare(a.word));
      break;
  }

  return(
    <>
      {loading === true ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{base: 4, md: 8 }} justify="center" direction="column" spacing="30px" >
          <SortFunction setSort={setSort} />
          {wordList.length === 0 ? (
            <WrapItem  h="90vh">
              <Box m="auto">
                <p>単語が登録されていません</p>
              </Box>
            </WrapItem>
          ) : (
            <>
            {sortedWordList.map( (word) => (
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
