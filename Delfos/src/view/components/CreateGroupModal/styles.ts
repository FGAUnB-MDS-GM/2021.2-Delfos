import styled from "styled-components/native";
import {TextInput } from "react-native";

export const Container = styled.View`
flex: 1;
`;

export const Overlay = styled.View`
  flex: 1;
  background-color: ${({theme})=> theme.colors.overlay};

  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 300px;
  height: 190px;

  border-radius: 15px;

  background-color: ${({theme})=> theme.colors.primary};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.text};
  color: ${({theme})=> theme.colors.text};
`;

export const  InputNameGroup = styled(TextInput).attrs({
  placeholder: "Novo grupo..."
})`
  background-color: ${({theme})=> theme.colors.white};
  width: 90%;
  border-radius: 5px;

  margin: 10px 10px;
  padding: 5px;

  color: ${({ theme }) => theme.colors.text};
  border-right-width: 2px;
`;

export const ButtonsView = styled.View`
  flex-direction: row; 
  width: 100%; 
  justify-content: space-between; 
  padding: 0px 10px;
  margin-top: 15px;
`;
