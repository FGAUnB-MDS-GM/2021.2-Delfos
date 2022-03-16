import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import { loadGroups } from './groupControl';

import { GroupProps } from "../models/groups";

const Context = createContext({} as ContextGroup);

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextGroup {
  group: GroupProps,
  load: boolean,
  selectGroup(group: GroupProps): void;
}

function ContextProvider({ children }: ContextProviderProps) {
  const [group, setGroup] = useState<GroupProps>({} as GroupProps);
  const [load, setLoad] = useState(true)

  async function loadLocalGroups() {
    const localGroups = await loadGroups();
    if (localGroups.length > 0) {
      setGroup(localGroups[0])
    }
    setLoad(false)
  }

  function selectGroup(group: GroupProps){
    setGroup(group);
  }

  useEffect(() => {
    loadLocalGroups();
  }, [])

  return (
    <Context.Provider value={{
      group: group,
      load: load,
      selectGroup
    }}>
      {children}
    </Context.Provider>
  );
}

function getContext(){
  const context = useContext(Context)
  return context;
}

export {ContextProvider, getContext}