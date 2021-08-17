import { VFC, memo } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Divider, Input, Textarea, ModalFooter, Button } from '@chakra-ui/react';
import { wordType } from '../../../types/api/wordType';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  word: wordType | null;
}

export const WordDetailModal: VFC<Props> = memo( (props) => {

  const { isOpen, onClose, word } = props;

  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.400">●</ModalHeader>
        <ModalBody mx={12}>
          <Divider my={4} />
          <Input value={word?.word} placeholder="タイトル" readOnly />
          <Divider my={4} />
          <Textarea h="10em" value={word?.memo} placeholder="メモ" readOnly />
          <Divider my={4} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

});
