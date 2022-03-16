import styled from 'styled-components/native';
import {FlatListProps, FlatList, TextInput, TextInputProps } from 'react-native';
import theme from '../../components/theme/theme';
import { RectButton } from 'react-native-gesture-handler';
import { NotificationRequest } from "expo-notifications";

import { ToDoProps } from '../../../models/toDos';

export const Container = styled.View`
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex: 1;

`;


export const Header = styled.View`
  width: 100%;
  height: 250px;
  margin-top: 40px;
`;

export const Content = styled.View`
  flex: 1;

`;

export const ButtonGroups = styled.View`
  width: 30px;
  margin-left: 10px;
  justify-content: center;
`;

export const HeaderHome = styled.View`
  margin: 15px 30px;
  align-items: center;
  justify-content: center;
`;

export const TitleBox = styled.View`
  width: 100%;
  height: 60px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
  border-width: 5px;
  border-color: ${({ theme }) => theme.colors.text};

  background-color: ${({ theme }) => theme.colors.secondary};

  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${({ theme }) => theme.fonts.text};
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({theme})=> theme.colors.text};

`;

export const Search = styled.View`
  width: 100%;
  margin: 10px ;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 5px 10px;
`;

export const SearchInput = styled(TextInput).attrs({
  placeholder: "O que tenho para fazer hoje?"
})`
    width: 90%;

    color: ${({ theme }) => theme.colors.text};
    border-right-width: 2px;
`;

export const Listagem = styled(FlatList as new (props: FlatListProps<ToDoProps>)=> FlatList<ToDoProps>).attrs({
  contentContainerStyle:{
    padding: 10,
  }
})`
`;

export const Footer = styled.View`
  padding: 10px;
  justify-content: flex-end;

  
`;

export const ButtonAddTodo = styled(RectButton)`
  width: 100%;
  height: 45px;

  align-items: center;
  justify-content: center;


`;

export const RefreshButtonView = styled.View`
  position: absolute;
  bottom: 80px; 
  right: 22px; 
  background-color: ${({theme})=> theme.colors.primary}; 
  width: 50px; 
  height: 50px; 
  border-radius: 25px; 
  align-items: center; 
  justify-content: center;
`;


