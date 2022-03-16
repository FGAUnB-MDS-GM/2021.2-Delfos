import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Modal } from "react-native";

import { BackgroundLinear } from "../../components/BackgroundLinear";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CreateGroupModal } from "../../components/CreateGroupModal";
import { GroupButton } from "../../components/GroupButton";
import { MenuButton } from "../../components/MenuButton";

import { GroupProps } from '../../../models/groups';
import { verifyStatusGroup, deleteGroup, createGroup, loadGroups } from "../../../control/groupControl";

import {
  Container,
  Content,
  Header,
  GroupList
} from './styles';
import { getContext } from "../../../control/contextControl";

export function Groups() {

  const [asyncGroups, setAsyncGroups] = useState<GroupProps[]>([]);
  const [modalGroup, setModalGroup] = useState(false);

  const navigation = useNavigation();
  const { selectGroup } = getContext();

  function handleGoHome() {
    navigation.navigate('TabRoutes')
  }

  function handleSelectGroup(group: GroupProps) {
    selectGroup(group);
    navigation.navigate('TabRoutes');
  }

  function handleOpenModal() {
    setModalGroup(true);
  }

  function handleCloseModal() {
    setModalGroup(false);
  }

  async function handleConfirmCreateGroup(groupName: string) {
    await createGroup(groupName);
    await refreshGroups();
    setModalGroup(false);
  }

  async function handleChangeStatusGroup(group: GroupProps) {
    await verifyStatusGroup(group);
    await refreshGroups();

  }

  async function handleDeleteGroup(group: GroupProps) {
    await deleteGroup(group);
    await refreshGroups();
  }

  async function refreshGroups() {
    const groups = await loadGroups();
    setAsyncGroups(groups);
  }

  useEffect(() => {
    refreshGroups();
  }, [modalGroup]);

  return (
    <Container>
      <BackgroundLinear type="secondary">
        <Content>
          <Header>
            <MenuButton
              onPress={handleGoHome}
              black
            />
          </Header>
          <GroupList
            data={asyncGroups}
            keyExtractor={item => item.groupName}
            renderItem={({ item }) => (
              <GroupButton
                enable={item.enable}
                id={item.groupName} onPress={() => handleSelectGroup(item)}
                disableGroup={() => handleChangeStatusGroup(item)}
                deleteGroup={() => handleDeleteGroup(item)}
              />
            )}
          />

          <View style={{ width: "100%", marginBottom: 20, paddingHorizontal: 10 }}>
            <ButtonAdd icon="plus-circle" onPress={handleOpenModal} />
          </View>
          <Modal visible={modalGroup}>
            <CreateGroupModal handleCancelCreateGroup={handleCloseModal} handleConfirmCreateGroup={handleConfirmCreateGroup} />
          </Modal>
        </Content>
      </BackgroundLinear>
    </Container>
  );
}