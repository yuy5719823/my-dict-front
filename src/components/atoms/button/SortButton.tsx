import { VFC, memo, ReactNode } from 'react';
import { Button } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
  onClick: () => void;
  bool: boolean;
  children: ReactNode;
}

export const SortButton:VFC<Props> = memo((props) => {

  const { onClick, bool, children } = props;

  return(
    <Button as="a" _hover={{cursor:"pointer"}} onClick={onClick}>
      {children}{bool? <ChevronUpIcon/> : <ChevronDownIcon/>}
    </Button>
  );
})
