import { NotesProps } from "../models/notes";
import {
  addNotesAsyncStorage,
  getAsyncStorageNotes,
  setAsyncStorageNotes,
  removeNoteAsyncStorage
} from '../data/asyncStorageNotes';

//Cria um nota no Array 
export async function createNote(note: NotesProps){
  await addNotesAsyncStorage(note);
}

//Retorna o array com todos os Notes salvos localmente
export async function loadNotes(){
  const notes = await getAsyncStorageNotes(); 
  return notes;
}

//deleta o Note
export async function deleteNote(note: NotesProps){
  await removeNoteAsyncStorage(note);
}

//Edita um Note de acordo
export async function editNote(note: NotesProps, text: string){

  const notes = await getAsyncStorageNotes(); 
  const index = notes.findIndex(item => item.id == note.id); 

  notes[index] = {
    id: note.id,
    content: text
  }
  await setAsyncStorageNotes(notes);

}