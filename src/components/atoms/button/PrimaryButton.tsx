import { VFC, memo, ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  loading: boolean;
}

export const PrimaryButton: VFC<Props> = memo((props) => {

  const { children, onClick, loading=false} = props;

  return(
    <Button width="100%" backgroundColor="teal.400" color="white" _hover={{opacity: 0.8}} onClick={onClick} isLoading={loading} >
      {children}
    </Button>
    );

});
