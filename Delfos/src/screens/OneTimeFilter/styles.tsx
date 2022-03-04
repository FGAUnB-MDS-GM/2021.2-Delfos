import styled from "styled-components/native";

export const Container = styled.View``;

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

export const Listagem = styled.View`
  padding: 10px;
`;
