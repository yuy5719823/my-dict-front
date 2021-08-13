import { VFC, memo } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button } from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickArchive: () => void;
  onClickSignOut: () => void;
}

export const MenuDrawer: VFC<Props> = memo((props) => {

  const { isOpen, onClose, onClickHome, onClickArchive, onClickSignOut } = props;

  return(
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
    <DrawerOverlay>
      <DrawerContent opacity="0.8">
        <DrawerBody p={0} bg="gray.100" >
          <Button w="100%" _focus={{outline: "none"}} onClick={onClickHome}>TOP</Button>
          <Button w="100%" _focus={{outline: "none"}} onClick={onClickArchive}>アーカイブ</Button>
          <Button w="100%" _focus={{outline: "none"}} onClick={onClickSignOut}>サインアウト</Button>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
  );

});
