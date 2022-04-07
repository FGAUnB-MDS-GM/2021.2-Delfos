import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";

import { NotesProps } from "../../models/notes";

const dataKey = `@delfos:notes`;

//Busca o array de notes
export async function getAsyncStorageNotes(){
  const response = await AsyncStorage.getItem(dataKey)
  const notes: NotesProps[] = response ? JSON.parse(response): [];

  return notes;
}

//Sobrescreve o array de notes
export async function setAsyncStorageNotes(notes: NotesProps[]){
  await AsyncStorage.setItem(dataKey, JSON.stringify(notes))
}

//Adiciona um novo Notes no array
export async function addNotesAsyncStorage(note: NotesProps) {
  try {
    const notes = await getAsyncStorageNotes();
    const newNotes: NotesProps[] = 
    [
      ...notes,
      note
    ]
    await setAsyncStorageNotes(newNotes);
  } catch (error){
    console.log(error)
    Alert.alert('Erro', 'não foi possível adicionar esse note ;-;')
  }
}

//Remove um Note do array 
export async function removeNoteAsyncStorage(note: NotesProps){
  try {
    const notes = await getAsyncStorageNotes();
    const alteredNotes = notes.filter(item => item.id != note.id);
    setAsyncStorageNotes(alteredNotes);
  } catch(erro){
    Alert.alert('Error', 'Não foi possível remover esse note')
  }
}

