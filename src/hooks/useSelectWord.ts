import { useCallback, useState } from 'react';
import { wordType } from '../types/api/wordType';

type Props = {
  id: number;
  wordList: Array<wordType>;
}

export const useSetWord = () => {

  const [ selectedWord, setSelectedWord ] = useState<wordType | null>(null);

  const setWord = useCallback((props: Props) => {
    const { id, wordList } = props;
    const targetWord = wordList.find((word) => word.id === id );
    setSelectedWord(targetWord!);
  }, []);

  return { setWord, selectedWord }
}
