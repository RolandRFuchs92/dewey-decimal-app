import React from 'react';

import { getScans } from 'pages/booksOut/booksout.repo';
const context = React.createContext([]);

export default context;
export const Provider = context.Provider;
export const Consumer = context.Consumer;

export const reducer = async (state, action) => {
    switch(action.type){
        case constants.SCANSTODAY:
            return await getScans();
        default: 
            return state;
    }
}

export const constants = {
    SCANSTODAY: 'SCANSTODAY'
} 