import { TextInput } from "react-native";
import styled from "styled-components/native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ToggleButton extends RectButtonProps {
  isActive: boolean
}

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

export const Listagem = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  showsVerticalScrollIndicator: false
})``;

export const InputTodo = styled.TextInput.attrs({
  placeholder: "O que vou fazer?...",
  })`

  width: 100%;
  height: 45px;

  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({theme})=> theme.fonts.text};
  font-size: 20px;

  padding: 5px 10px;
`;

export const ToggleButton = styled(RectButton)<ToggleButton>`
  flex-direction: row;

  width: 100%;
  height: 45px;

  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
`;

export const TextButton = styled.Text`

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({theme})=> theme.fonts.text};
  font-size: 20px;
  
`;

export const FinalButton = styled.View`
  flex-direction: row;

  width: 100%;

  align-items: center;
  justify-content: space-between;
`;
export const CancelButton = styled(RectButton)`
  width: 100px;
  height: 40px;

  background-color: ${({theme})=> theme.colors.cancel};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;
export const ConfirmButton = styled(RectButton)`
  width: 100px;
  height: 40px;

  background-color: ${({theme})=> theme.colors.success};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const InputTime = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const InputTimeText = styled.TextInput.attrs({
  placeholder: "________",
  keyboardType: 'numeric',
  maxLength: 2,
  })`


  color: ${({ theme }) => theme.colors.text};
  font-family: ${({theme})=> theme.fonts.text};
  font-size: 20px;

  padding: 5px 10px;
`;
