import React from 'react';

const context = React.createContext(null);

export default context;
export const Provider = context.Provider;
export const Consumer = context.Consumer;