import { memo, VFC, useState, ChangeEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Divider, Input, Textarea, ModalFooter, Spacer, Button, Box } from '@chakra-ui/react';
import { useAddWord } from '../../../hooks/useAddWord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  update: boolean;
  setUpdate: (bool : boolean) => void;
}

export const AddWordModal: VFC<Props> = memo((props) => {

  const { isOpen, onClose, update, setUpdate } = props;
  const { addWord } = useAddWord();

  const [ title, setTitle ] = useState<string>("");
  const [ memo, setMemo] = useState<string>("");

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value); 
  const onChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => setMemo(event.target.value);
  const onClickAdd = async() => {
    addWord({ title, memo });
    // 初期化
    setTitle("");
    setMemo("");
    onClose();
    await wordListUpdate();
  };

  const wordListUpdate = () => {
    return new Promise<void>( (resolve) => {
      setTimeout( () => {
        setUpdate(!update);
        resolve();
      }, 200)
    } )
  } 


  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.400">●</ModalHeader>
        <Box fontSize="xl" fontWeight="light" color="gray.600" textAlign="center">単語を追加</Box>
        <ModalBody mx={12}>
          <Divider my={4} />
          <Input value={title} placeholder="タイトル" onChange={onChangeTitle} />
          <Divider my={4} />
          <Textarea h="10em" value={memo} placeholder="メモ" onChange={onChangeMemo} />
          <Divider my={4} />
        </ModalBody>
        <ModalFooter>
          <Spacer />
          <Button onClick={onClickAdd}>
            追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
})
