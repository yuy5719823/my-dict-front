import { VFC, memo, ReactNode } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  onClick: () => void;
  loading: boolean;
  buttonColor?: string;
}

export const PrimaryButton: VFC<Props> = memo((props) => {

  const { children, onClick, loading=false, buttonColor="teal.400"} = props;

  return(
    <Button width="100%" backgroundColor={buttonColor} color="white" _hover={{opacity: 0.8}} onClick={onClick} isLoading={loading} >
      {children}
    </Button>
    );

});
