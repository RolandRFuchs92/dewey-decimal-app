import React from 'react';

import { getScanns } from 'pages/booksOut';
const context = React.createContext([]);

export default context;
export const Provider = context.Provider;
export const Consumer = context.Consumer;

export const reducer = async (state, action) => {
    debugger;
    switch(action.type){
        case constants.SCANSTODAY:
            return await getScanns();
        default: 
            return state;
    }
}

export const constants = {
    SCANSTODAY: 'SCANSTODAY'
} 