import { VFC, memo, useCallback, useState } from 'react';
import { useArchiveWordList } from '../../hooks/useWordArchiveList';
import { useEffect } from 'react';
import {  useDisclosure } from '@chakra-ui/react';
import { WordDetailModal } from '../organisms/word/WordDetailModal';
import { useSetWord } from '../../hooks/useSelectWord';
import { WordCardList } from '../templates/WordCardList';

export const Archive: VFC = memo(() => {

  const {isOpen, onOpen, onClose} = useDisclosure();

  const { fetchWordList, loading, archiveWordList} = useArchiveWordList();
  const { setWord, selectedWord } = useSetWord();

  // 強制的に再レンダリング
  const [ update, setUpdate ] = useState<boolean>(false);

  const onClickWord = useCallback((id: number) => {
    setWord({id, wordList: archiveWordList});
    onOpen();
  }, [archiveWordList,onOpen,setWord])

  useEffect(() => {
    fetchWordList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[update]);

  return(
    <>
      <WordCardList loading={loading} wordList={archiveWordList} onClickWord={onClickWord} />
      <WordDetailModal mode="archive" isOpen={isOpen} onClose={onClose} word={selectedWord} update={update} setUpdate={setUpdate} />
    </>
    );

});
