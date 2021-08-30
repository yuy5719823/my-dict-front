import { VFC, memo, useCallback } from 'react';
import { useDisclosure, Grid, GridItem } from '@chakra-ui/react';


import { WordCardList } from '../templates/WordCardList';
import { AddWordIcon } from '../atoms/button/AddWordButton';
import { FunctionalArea } from '../molecules/FunctionalArea';

export const Home: VFC = memo(() => {

  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();

  const onClickAddWord = useCallback( () => {
    onOpenAdd();
  }, [onOpenAdd])

  return(
    <>
    <Grid templateRows={{base: "repeat(1, 1fr)" ,md: "repeat(1, 1fr)"}} p={4} >
      <GridItem display={{base: "none", md: "inline-grid"}} h={{base: "0", md: "10vh"}} >
        <FunctionalArea onClickAddWord={onClickAddWord} />
      </GridItem>
      <GridItem>
        <WordCardList mode="default"　isOpenAdd={isOpenAdd} onCloseAdd={onCloseAdd} />
      </GridItem>
    </Grid>
      <AddWordIcon onClick={onClickAddWord} />
    </>
  );

});
