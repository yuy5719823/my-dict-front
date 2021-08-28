import { VFC, memo } from 'react';
import { IconButton, Flex } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

type  Props = {
  onClick: () => void;
}

export const AddWordIcon: VFC<Props> = memo((props) => {

  const { onClick } = props;

  return(
    <Flex display={{md: "none"}} position="fixed" top="85vh" left="85vw">
      <IconButton aria-label="add words" icon={<AddIcon />} bg="teal.300" size="lg" borderRadius="100%" shadow="md" _hover={{opacity: "0.8"}} _active={{}} onClick={onClick}/>
    </Flex>
  );

});
