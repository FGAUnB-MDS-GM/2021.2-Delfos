import React, { useEffect, useState } from "react";
import {
  ButtonGroups,
  Container,
  Header,
  HeaderTitle,
  NoteList,
  TitleBox,
  Title,
  SubTitle,
  AddNoteButtonView,
  Overlay,
  Content,
  InputTextNote,
  ButtoonView,
  DeleteButton,
  DeleteButtonView
} from './styles';

import { CancelButton, ConfirmButton } from "../../screens/AddTodo/styles";

import { NotesBox } from '../../components/NotesBox';
import { NotesProps } from "../../../models/notes";
import { BackgroundLinear } from "../../components/BackgroundLinear";
import { MenuButton } from "../../components/MenuButton";
import { useNavigation } from "@react-navigation/native";
import { RefreshButton } from "../../components/RefreshButton";
import { Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import theme from "../../components/theme/theme";
import { Feather } from '@expo/vector-icons';
import {
  createNote,
  editNote,
  loadNotes,
  deleteNote
} from '../../../control/notesControl';

export function Notes() {

  const [notes, setNotes] = useState<NotesProps[]>([]);
  const [text, setText] = useState('');

  const [selectedNote, setSelectedNote] = useState<NotesProps>({} as NotesProps);
  const [openModal, setOpenModal] = useState(false);

  const navigation = useNavigation();

  function handleGroupsList() {
    navigation.navigate('Groups')
  }

  async function handleCreateNote() {
    let newNote: NotesProps;
    if (!notes.length) {
      newNote = {
        id: "1",
        content: text
      }
    } else {
      newNote = {
        id: (notes.length + 2).toString(),
        content: text
      }
    }
    await createNote(newNote);
    setOpenModal(false);
  }

  function handleCancelNote() {
    setSelectedNote({} as NotesProps);
    setOpenModal(false);

  }

  async function handleConfirmEditNote(note: NotesProps, text: string) {
    await editNote(note, text)

    setSelectedNote({} as NotesProps);
    setOpenModal(false);

  }

  async function handleDeleteNote(note: NotesProps){
    await deleteNote(note);
    setSelectedNote({} as NotesProps);
    setOpenModal(false);
  }

  function handleOpenNote(note: NotesProps) {
    setSelectedNote(note);
    setOpenModal(true);
  }

  function handleAddNote() {
    setOpenModal(true)
  }

  async function refreshNotes() {
    const asyncNotes = await loadNotes();
    setNotes(asyncNotes);
  }

  useEffect(() => {
    refreshNotes();
  }, [openModal])

  return (
    <Container>
      <BackgroundLinear>
        <Header>
          <ButtonGroups>
            <MenuButton
              onPress={handleGroupsList}
            />
          </ButtonGroups>
          <HeaderTitle>
            <TitleBox>
              <Title>
                Just Do it!
              </Title>
            </TitleBox>
            <SubTitle>
              Bloco de notas
            </SubTitle>
          </HeaderTitle>
        </Header>
      </BackgroundLinear>
      <NoteList
        data={notes}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({ item }) =>
          <NotesBox
            id={item.id}
            content={item.content}
            onPress={() => handleOpenNote(item)}
          />
        }
      />
      <AddNoteButtonView>
        <RefreshButton
          addNotes
          onPress={handleAddNote}
        />
      </AddNoteButtonView>
      <Modal visible={openModal}>
        <Overlay>
          <Content>
            {selectedNote &&
              <DeleteButtonView>
                <GestureHandlerRootView>
                  <DeleteButton onPress={() => handleDeleteNote(selectedNote)}>
                    <Feather
                      name="trash-2"
                      color={theme.colors.text}
                      size={30}
                    />
                  </DeleteButton>
                </GestureHandlerRootView>
              </DeleteButtonView>
            }
            <InputTextNote 
              multiline
              textAlignVertical="auto"
              onChangeText={setText} defaultValue={selectedNote.content} 
            />
            <ButtoonView>
              <GestureHandlerRootView>
                <CancelButton onPress={handleCancelNote}>
                  <Feather
                    name="x"
                    color={theme.colors.white}
                    size={30}
                  />
                </CancelButton>
              </GestureHandlerRootView>
              <GestureHandlerRootView>
                <ConfirmButton onPress={selectedNote.content ? () => handleConfirmEditNote(selectedNote, text) : handleCreateNote}>
                  <Feather
                    name="check"
                    color={theme.colors.white}
                    size={30}
                  />
                </ConfirmButton>
              </GestureHandlerRootView>
            </ButtoonView>
          </Content>
        </Overlay>
      </Modal>
    </Container >
  );
}