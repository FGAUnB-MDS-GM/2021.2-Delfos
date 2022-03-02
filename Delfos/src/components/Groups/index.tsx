import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Group,
} from './styles';
import { ButtonAdd } from "../ButtonAdd";
import { GroupButton } from "../GroupButton";
import { View } from "react-native";

interface GroupsProps {
  id: string;
  data: string;
  enable: boolean;
}

const localGroups = [
  {
    id: "Grupo 1",
    data: "dadada",
    enable: true
  },
  {
    id: "2",
    data: "asasa",
    enable: true
  },
  {
    id: "3",
    data: "uiuiui",
    enable: true
  },
  {
    id: "4",
    data: "asasa",
    enable: true
  },
  {
    id: "5",
    data: "asasa",
    enable: true
  },
  {
    id: "6",
    data: "asasa",
    enable: true
  },
  {
    id: "7",
    data: "asasa",
    enable: true
  },
  {
    id: "8",
    data: "asasa",
    enable: true
  },
  {
    id: "9",
    data: "asasa",
    enable: true
  },
  {
    id: "10",
    data: "asasa",
    enable: true
  },
  {
    id: "11",
    data: "asasa",
    enable: true
  },
  {
    id: "12",
    data: "asasa",
    enable: true
  },
  {
    id: "13",
    data: "asasa",
    enable: true
  },
  {
    id: "14",
    data: "asasa",
    enable: true
  },
  {
    id: "15",
    data: "asasa",
    enable: true
  },
  {
    id: "16",
    data: "asasa",
    enable: true
  },
  {
    id: "17",
    data: "asasa",
    enable: true
  },
  {
    id: "18",
    data: "asasa",
    enable: true
  },
  {
    id: "19",
    data: "asasa",
    enable: true
  },
  {
    id: "20",
    data: "asasa",
    enable: true
  },
  {
    id: "21",
    data: "asasa",
    enable: true
  },


]

interface Props {
  handleSelectGroup: (id: string) => void;
  handleCreateGroup: () => void;
}

function setEnable (id: string){
  //funçaõ que vai mudar o estado de determinado Grupo para Disable
  //  e em seguida desmarcar todos os ToDos que estiverem dentro daquele grupo 
  // a propridade "data" é o que deveria ser um Array de string de id.
}

export function Groups({ handleSelectGroup, handleCreateGroup }: Props) {

  const [asyncGroups, setAsyncGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  function teste() {
    console.log("teste")
  }
  return (
    <Container>
      <Group
        data={localGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GroupButton id={item.id} onPress={()=>handleSelectGroup(item.id)} disableGroup={()=> setEnable(item.id)}/>
        )}
      />

      <View style={{ width: "100%", marginBottom: 20}}>
        <ButtonAdd icon="plus-circle" style={{ width: "100%" }} onPress={handleCreateGroup}/>
      </View>
    </Container>
  );
}