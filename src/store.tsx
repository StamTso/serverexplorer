import React, { createContext, useReducer, Dispatch } from 'react';
import ACTION_TYPES from './utils/constants/ACTION_TYPES'
import { SortConfig, ServersList } from './types/index';

type InitialState = {
    serverList: ServersList;
    sortConfig: SortConfig | null
};

type Action = {
    type: string,
    payload: any
}

const initialState = {
    serverList: [],
    sortConfig: null
};

const store = createContext<{ state: InitialState; dispatch: Dispatch<any> }>({ state: initialState, dispatch: () => null });
const { Provider } = store;

// Basic state provider for the store. For simplicity the implementation of the reducer is passed directly in the first callback
const StateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer((state: InitialState, action: Action) => {
        switch (action.type) {
            case ACTION_TYPES.UPDATE_SERVERLIST:
                return  {...state, serverList: action.payload};
            case ACTION_TYPES.UPDATE_SORTCONFIG:
                const updatedState = {...state, sortConfig: action.payload};
                return updatedState;
            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

//store is exported for access to the state, StateProvider is used to wrap the elements in the DOM tree
export { store, StateProvider };
