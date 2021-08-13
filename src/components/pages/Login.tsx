import { VFC, memo } from 'react';
import { Input, Flex, Box, Heading, Divider, Link, Stack } from '@chakra-ui/react';

import { PrimaryButton } from '../atoms/button/PrimaryButton';

export const Login: VFC = memo(() => {
  return(
    <Flex align="center" justify="center" height="100vh" flexDirection="column">
      <Box bg="white" w="sm" p={4} borderRadius={8} shadow="md">
        <Heading as="h1" size="lg" textAlign="center" fontWeight="light" color="gray.600">MyDictionary</Heading>
        <Divider　m={2} />
        <Stack spacing={4} py={3} px={8} >
          <Input type="email" placeholder="メールアドレスを入力" />
          <Input type="password" placeholder="パスワードを入力" />
          <PrimaryButton>ログイン</PrimaryButton>
        </Stack>
      </Box>
    <Box py={8}>
      <Link color="gray.500" borderBottom="solid 2px white" _hover={{ backgroundColor: "gray.50" }} p={1} borderRadius={8}>
        アカウントの作成
      </Link>
    </Box>
    </Flex>
  );

});
