import { VFC, memo, useState, ChangeEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Divider, Input, Textarea, ModalFooter, Button, Checkbox, Spacer } from '@chakra-ui/react';
import { wordType } from '../../../types/api/wordType';
import { useEffect } from 'react';
import { useUpdateWord } from '../../../hooks/useUpdateWord';
import { useDeleteWord } from '../../../hooks/useDeleteWord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  word: wordType | null;
  mode: "default" | "archive";
  update: boolean;
  setUpdate: (bool: boolean) => void;
}

export const WordDetailModal: VFC<Props> = memo( (props) => {

  const { isOpen, onClose, word , mode, update, setUpdate } = props;

  const [ title, setTitle ] = useState<string>("");
  const [ memo, setMemo ] = useState<string>("");
  const [ archive, setArchive ] = useState<boolean>(false);

  const { updateWord } = useUpdateWord();
  const { deleteWord } = useDeleteWord();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => setMemo(event.target.value);
  const onChangeArchive = (event: ChangeEvent<HTMLInputElement>) => setArchive(!archive);
  const onClickUpdate = () => {
    updateWord({id: word!.id , wordData: {word: title, memo: memo, archive: archive}});
    setUpdate(!update);
    onClose();
  }
  const onClickDelete = () => {
    deleteWord(word!.id);
    setUpdate(!update);
    onClose();
  }

  useEffect(() => {
    setTitle(word?.word ?? "");
    setMemo(word?.memo ?? "");
    setArchive(word?.archive ?? false);
  }, [word])

  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.400">●</ModalHeader>
        <ModalBody mx={12}>
          <Divider my={4} />
          <Input value={title} placeholder="タイトル" onChange={onChangeTitle} />
          <Divider my={4} />
          <Textarea h="10em" value={memo} placeholder="メモ" onChange={onChangeMemo} />
          <Divider my={4} />
        </ModalBody>
        <ModalFooter>
          <Checkbox onChange={onChangeArchive} defaultIsChecked={word?.archive}>
            非表示にする
          </Checkbox>
          <Spacer />
          { mode === "archive" && 
          <Button mr={6} fontWeight="light" onClick={onClickDelete}>削除</Button> }
          <Button onClick={onClickUpdate} fontWeight="light">
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

});
