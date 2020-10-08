import React, {createContext, useReducer} from 'react';

const initialState = {
    serverList: [],
    sortConfig: null
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'UPDATE_SERVERLIST':
                return {state, ...action.serverList};
            case 'UPDATE_SORTCONFIG':
                return {state, ...action.sortConfig};
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };