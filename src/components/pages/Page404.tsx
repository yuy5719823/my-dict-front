import { Box, Heading, Link } from '@chakra-ui/react';
import { VFC, memo } from 'react';
import { useHistory } from 'react-router-dom';

export const Page404: VFC = memo(() => {

  const history = useHistory();

  return(
    <Box textAlign="center" my="120px">
      <Heading as="h1" p={4}>ページが見つかりません</Heading>
      <Link onClick={() => history.push("/home")}>TOPページに戻る</Link>
    </Box>
    );

});
