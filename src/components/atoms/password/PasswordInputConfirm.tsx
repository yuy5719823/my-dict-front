import { VFC, memo, useState, ChangeEvent } from 'react';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

type Props = {
  setPlaceholder: string;
  setInput: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInputConfirm: VFC<Props> = memo((props) => {

  const {setPlaceholder, setInput, onChange} = props;

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return(
    <InputGroup>
      <Input type={show? "text" : "password" } value={setInput} placeholder={setPlaceholder}  onChange={onChange} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
