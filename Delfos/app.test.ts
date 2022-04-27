import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createGroup,
  loadGroups
} from './src/control/groupControl';

import {
  createNote,
  deleteNote,
  editNote,
  loadNotes
} from './src/control/notesControl';

import {
  scheduleNotificationTimeInterval,
  scheduleNotificationDaily,
  loadToDos,
  deleteToDo
} from "./src/control/todoControl";

jest.mock('expo-notifications', () => {
  return {
    scheduleNotificationAsync: () => {
      return "10938120dsa-0d9adp3"
    }
  }
});

beforeEach(() => {
  AsyncStorage.clear();
});

it('Check if note is created', async () => {
  await createNote({ id: "1", content: "eita" });
  const notes = await loadNotes();

  expect(notes[0].id).toBe("1");
})

it('Check if note is edited', async () => {
  const noteTest = {
    id: "1",
    content: "Banana e goiaba"
  }
  await createNote(noteTest);
  await editNote(noteTest, "Lista de compras")
  const notes = await loadNotes();

  expect(notes[0].content).toBe("Lista de compras");
})

it('Check if note is deleted', async () => {
  const noteTest = {
    id: "1",
    content: "Banana e goiaba"
  }
  await createNote(noteTest);
  await deleteNote(noteTest)
  const notes = await loadNotes();

  expect(notes).toStrictEqual([])
})

it('Check if ToDo is created', async () => {
  await scheduleNotificationTimeInterval("1", "teste", false, 30, 13);
  const toDos = await loadToDos({ id: '1', groupName: "1", enable: true });

  expect(toDos[0].message).toBe("teste")
})

it('Check if ToDo is edited', async () => {
  const testGroup = {
    id: '1', groupName: "1", enable: true
  }
  const testToDo = {
    identifier: '10938120dsa-0d9adp3',
    message: 'teste',
    trigger: {
      type: 'timeInterval',
      repeat: false,
      hour: 13,
      minute: 30
    },
    checked: false
  }

  await scheduleNotificationTimeInterval("1", "teste", false, 30, 13);
  const toDos = await loadToDos({ id: '1', groupName: "1", enable: true });

  expect(toDos[0].trigger.type).toBe("timeInterval")

  await deleteToDo(testGroup, testToDo)
  await scheduleNotificationDaily("1", "teste", 30, 13);

  const toDos2 = await loadToDos({ id: '1', groupName: "1", enable: true });


  expect(toDos2[0].trigger.type).toBe("daily")
  
})

it('Check if ToDo is deleted', async () => {
  const testGroup = {
    id: '1', groupName: "1", enable: true
  }
  const testToDo = {
    identifier: '10938120dsa-0d9adp3',
    message: 'teste',
    trigger: {
      type: 'timeInterval',
      repeat: false,
      hour: 13,
      minute: 30
    },
    checked: false
  }
  await scheduleNotificationTimeInterval("1", "teste", false, 30, 13);
  await deleteToDo(testGroup, testToDo)

  const toDos = await loadToDos(testGroup);


  expect(toDos).toStrictEqual([])
})




