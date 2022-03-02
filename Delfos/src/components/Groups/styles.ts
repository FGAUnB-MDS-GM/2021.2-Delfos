import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";

interface GroupsProps {
  id: string;
  data: string;
  enable:boolean;
} 

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 20px;
`;

export const Group = styled(FlatList as new(props: FlatListProps<GroupsProps>)=> FlatList<GroupsProps>)`
  width: 100%;
  padding: 0px 17px;
`;