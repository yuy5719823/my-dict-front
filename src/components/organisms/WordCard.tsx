import { VFC, memo } from 'react';
import { Box, Text } from '@chakra-ui/react';

type Props = {
  title: string;
  wordMemo: string;
}

export const WordCard:VFC<Props> = memo((props) =>{

  const { title, wordMemo } = props;

  return(
    <Box h={{base: "215px", md: "160px"}} w={{base: "90vw", md: "65vw", lg: "60vw" }} bg="white" shadow="lg" borderRadius="12px"  _hover={{cursor:"pointer", opacity: 0.8}} overflow="hidden" >
      <Text m={4} as="h3" fontSize="2xl" fontWeight="medium"　display="inline-block" borderBottom="dashed 2px #BEE3F8">
        {title}
      </Text>
      <Text px={4} fontSize="md"  textOverflow="ellipsis">
        {wordMemo}
      </Text>
    </Box>
    );
});
