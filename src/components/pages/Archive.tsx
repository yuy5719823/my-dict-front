import { VFC, memo } from 'react';
import { WordCardList } from '../templates/WordCardList';

export const Archive: VFC = memo(() => {

  return(
    <>
      <WordCardList mode="archive" />
    </>
    );

});
