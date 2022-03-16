import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";

import {GroupProps} from '../../../models/groups'

export const Container = styled.View`
  flex: 1;
`;
export const Content = styled.View`
  width: 100%;
  height: 96%;
  margin-top: 40px;
`;

export const Header = styled.View`
  width: 30px;
  margin-left: 10px;
  justify-content: center;
`;

export const GroupList = styled(FlatList as new(props: FlatListProps<GroupProps>)=> FlatList<GroupProps>)`
  width: 100%;
  padding: 0px 17px;
`;