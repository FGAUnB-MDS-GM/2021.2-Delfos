import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import theme from '../../global/theme';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  justify-content: space-between;
  width: 100%;
  height: 100%;

`;


export const Header = styled.View`
  width: 100%;
  height: 250px;
  margin-top: 40px;
`;

export const ButtonGroups = styled.View`
  width: 30px
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

  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${({ theme }) => theme.fonts.text};
`;

export const Search = styled.View`
  width: 100%;
  margin: 10px 
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

export const Listagem = styled.View`
  padding: 10px;

`;

export const Footer = styled.View`

  padding: 10px;
`;

export const ButtonAddTodo = styled(RectButton)`
  width: 100%;
  height: 45px;

  align-items: center;
  justify-content: center;


`;

export const Content = styled.View``;