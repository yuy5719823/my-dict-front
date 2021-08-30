import { memo, VFC } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';

type Props = {
  onClickAddWord: () => void;
}

export const FunctionalArea:VFC<Props> = memo( (props) => {

  const {onClickAddWord} = props;

  return (
    <Flex justifyContent="center" textAlign="center" flexDirection="column">
      <Box>
        <Button onClick={onClickAddWord} bg="green.200" shadow="md" fontWeight="bold" _hover={{}}>単語を追加</Button>
      </Box>
  </Flex>
  );
})
