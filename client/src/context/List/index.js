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
    pageSize: 10,
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

  const setSkip = useCallback(
    value => {
      mergeState({ skip: value });
    },
    [mergeState],
  );

  const providerValue = useMemo(
    () => ({
      state,
      setSkip,
    }),
    [state, setSkip],
  );

  return (
    <ListContext.Provider value={providerValue}>
      {children}
    </ListContext.Provider>
  );
};

export const useListContext = () => useContext(ListContext);
