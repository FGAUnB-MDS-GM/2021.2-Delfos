import styled from "styled-components/native";

export const Container = styled.View`

  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};

  border-color: black;
  border-width: 2px;

  margin-bottom: 10px;
  padding: 0px 10px;

`;

export const ViewButton = styled.View`
  flex: 1;
  padding: 0px 10px;

  justify-content: center;


`;

export const TextButton = styled.Text`
  font-size: 20px;
  font-family: ${({theme})=> theme.fonts.text};
`;