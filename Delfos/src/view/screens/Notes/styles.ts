import {FlatListProps, FlatList} from 'react-native';
import styled from "styled-components/native";
import { NotesProps } from '../../../models/notes';
import {TextInput } from "react-native";
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 150px;
  margin-top: 40px;
`;

export const ButtonGroups = styled.View`
  width: 30px;
  margin-left: 10px;
  justify-content: center;
`;

export const HeaderTitle = styled.View`
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

  margin-bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({theme})=> theme.colors.text};
`;

export const SubTitle = styled.Text`
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({theme})=> theme.colors.text};
`;

export const NoteList = styled(FlatList as new (props: FlatListProps<NotesProps>)=> FlatList<NotesProps>).attrs({
  contentContainerStyle:{
    padding: 10,
  }
})``;

export const AddNoteButtonView = styled.View`
  position: absolute;
  bottom: 80px; 
  right: 22px; 
  background-color: ${({theme})=> theme.colors.secondary}; 
  width: 50px; 
  height: 50px; 
  border-radius: 25px; 
  align-items: center; 
  justify-content: center;
  border-width: 2px;
  border-color: ${({theme})=> theme.colors.primary};
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.overlay};

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  height: 300px;

  border-radius: 15px;

  background-color: ${({theme})=> theme.colors.secondary_light};

  justify-content: space-around;
  align-items: center;
`;

export const InputTextNote = styled(TextInput).attrs({
  
})`
  width: 90%;

  margin: 10px 10px;
  padding: 5px;

  color: ${({ theme }) => theme.colors.text};
`;
export const ButtoonView = styled.View`
  flex-direction: row; 
  width: 100%; 
  justify-content: space-between; 
  padding: 0px 10px;
  margin-top: 15px;
`;

export const DeleteButtonView = styled.View`
  width: 90%;
  align-items: flex-end;
`;

export const DeleteButton= styled(RectButton)``;