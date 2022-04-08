import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";

import { GroupProps } from "../../models/groups";

const dataKey = `@delfos:localgroups`

//Busca o array de grupos
export async function getAsyncStorageGroup() {
  const response = await AsyncStorage.getItem(dataKey)
  const groups: GroupProps[] = response ? JSON.parse(response) : [];

  return groups;
}

//Sobrescreve o array de grupos
export async function setAsyncStorageGroup(groups: GroupProps[]) {
  await AsyncStorage.setItem(dataKey, JSON.stringify(groups))
}

//Adiciona um novo Grupo no array de grupos
export async function addGroupAsyncStorage(group: GroupProps) {

  try {
    const groups = await getAsyncStorageGroup();
    const newGroups: GroupProps[] =
      [
        ...groups,
        group,
      ]
    await setAsyncStorageGroup(newGroups);
  }
  catch (error) {
    console.log(error)
    Alert.alert('Erro', 'não foi possível adicionar esse grupo')
  }
}

//Remove um Grupo do array de grupos
export async function removeGroupAsyncStorage(group: GroupProps) {
  try {
    const groups = await getAsyncStorageGroup();

    const alteredGroups = groups.filter(item => item.id != group.id);

    setAsyncStorageGroup(alteredGroups);
  } catch (error) {
    Alert.alert('Error', 'Não foi possível remover esse grupo')
  }
}
