import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';

const ListContext = createContext();

export const ListContextProvider = ({ children }) => {
  const initialState = {
    characters: [],
  };

  const [state, setContextState] = useState(initialState);

  const mergeState = useCallback(
    partialState => {
      setContextState(prevState => ({
        ...prevState,
        ...partialState,
      }));
    },
    [setContextState],
  );

  const arrayMergeState = useCallback(
    partialState => {
      setContextState(prevState => {
        const mergeArray = {
          characters: [...prevState.characters, ...partialState],
        };

        return {
          ...prevState,
          ...mergeArray,
        };
      });
    },
    [setContextState],
  );

  const setStorageData = useCallback(
    value => {
      arrayMergeState([value]);
    },
    [arrayMergeState],
  );

  const setCharacters = useCallback(
    value => {
      mergeState({ characters: value });
    },
    [mergeState],
  );

  const removeListItem = useCallback(
    index => {
      setContextState(prevState => {
        prevState.characters.splice(index, 1);
        const mergeArray = {
          characters: prevState.characters,
        };

        return {
          ...prevState,
          ...mergeArray,
        };
      });
    },
    [setContextState],
  );

  const providerValue = useMemo(
    () => ({
      state,
      setCharacters,
      setStorageData,
      removeListItem,
    }),
    [state, setCharacters, setStorageData, removeListItem],
  );

  return (
    <ListContext.Provider value={providerValue}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);
