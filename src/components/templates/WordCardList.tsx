import { VFC, memo } from 'react';
import { Center, Spinner, Wrap, WrapItem, Box } from '@chakra-ui/react';

import { WordCard } from '../organisms/word/WordCard';
import { wordType } from '../../types/api/wordType';

type Props = {
  loading: boolean;
  wordList: Array<wordType>;
  onClickWord: (id:number) => void;
}

export const WordCardList:VFC<Props> = memo((props) => {

  const { loading, wordList, onClickWord } = props;

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
    </>
  );
})
