import { VFC, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { SortButton } from '../atoms/button/SortButton';

type Props = {
  setSort: ( setType :string ) => void;
}

export const SortFunction:VFC<Props> = (props) => {

  const { setSort } = props;

  const [ sortSwitchName, setSortSwitchName ] = useState<boolean>(false);
  const [ sortSwitchCreate, setSortSwitchCreate ] = useState<boolean>(true);

  const onClickSortName = () => {
    if(sortSwitchName){
      setSort("name");
    }else{
      setSort("nameDesc");
    }
    setSortSwitchName(!sortSwitchName);
    if(sortSwitchCreate){
      setSortSwitchCreate(false);
    };
  };
  
  const onClickSortCreate = () => {
    if(sortSwitchCreate){
      setSort("createdAtDesc")
    }else{
      setSort("createdAt");
    }
    setSortSwitchCreate(!sortSwitchCreate);
    if(sortSwitchName){
      setSortSwitchName(false);
    }
  };

  return(
    <Flex justifyContent="center" >
      <SortButton onClick={onClickSortName} bool={sortSwitchName} >名前順</SortButton>
      <SortButton onClick={onClickSortCreate} bool={sortSwitchCreate} >作成順</SortButton>
  </Flex>
  );
}
