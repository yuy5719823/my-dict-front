import { VFC, memo } from 'react';
import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody } from '@chakra-ui/react';

type Props = {
  deleteUser: () => void;
  isTestUser: boolean;
}

export const DeleteAccountFunction:VFC<Props> = memo((props) => {

  const { deleteUser, isTestUser } = props;

  return(
    <Popover>
    <PopoverTrigger>
      <Button as="a" fontSize="sm" color="gray.500" borderBottom="solid 2px white" _hover={{ backgroundColor: "gray.50", cursor:"pointer" }} p={1} borderRadius={8} >
        アカウントの削除
      </Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent _focus={{outline:"none"}}>
        <PopoverArrow />
        <PopoverHeader color="gray.600" textAlign="center">アカウントを削除しますか?</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody textAlign="center">
          <Button fontSize="sm" bg="gray.200" outline="none" onClick={deleteUser} disabled={isTestUser} >削除する</Button>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
  );
})
