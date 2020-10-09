import React, {createContext, useReducer, Dispatch} from 'react';
import {ServerList} from "./components/ServerList";

type Server = {
    name: string,
    distance: number
}

type SortConfig = {
    key: string,
    direction: string
};

type ServerList = Array<Server>;

type InitialState = {
    serverList: ServerList;
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

const store = createContext<{state: InitialState; dispatch: Dispatch<any>}>({state: initialState, dispatch: () => null});
const { Provider } = store;

const StateProvider: React.FC = ( { children } ) => {
    const [state, dispatch] = useReducer((state: InitialState, action: Action) => {
        switch(action.type) {
            case 'UPDATE_SERVERLIST':
                console.log(action, state);
                state.serverList.push(action.payload);
                return state;
            case 'UPDATE_SORTCONFIG':
                state.sortConfig = action.payload;
                return state;
            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
