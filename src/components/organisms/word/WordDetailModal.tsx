import { VFC, memo, useState, ChangeEvent } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Divider, Input, Textarea, ModalFooter, Button, Checkbox, Spacer } from '@chakra-ui/react';
import { wordType } from '../../../types/api/wordType';
import { useEffect } from 'react';
import { useUpdateWord } from '../../../hooks/useUpdateWord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  word: wordType | null;
}

export const WordDetailModal: VFC<Props> = memo( (props) => {

  const { isOpen, onClose, word } = props;

  const [ title, setTitle ] = useState<string>("");
  const [ memo, setMemo ] = useState<string>("");
  const [ archive, setArchive ] = useState<boolean>(false);

  const { updateWord } = useUpdateWord();

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeMemo = (event: ChangeEvent<HTMLTextAreaElement>) => setMemo(event.target.value);
  const onClickArchive = () => setArchive(!archive);
  const onClickUpdate = () => {
    updateWord({id: word!.id , wordData: {word: title, memo: memo, archive: archive}});
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
          <Input value={title} placeholder="タイトル" onChange={onChangeTitle} select />
          <Divider my={4} />
          <Textarea h="10em" value={memo} placeholder="メモ" onChange={onChangeMemo} />
          <Divider my={4} />
        </ModalBody>
        <ModalFooter>
          <Checkbox onClick={onClickArchive} defaultIsChecked={word?.archive}>
            非表示にする
          </Checkbox>
          <Spacer />
          <Button onClick={onClickUpdate}>
            更新
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

});
