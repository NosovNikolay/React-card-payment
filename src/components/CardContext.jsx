import React, { useReducer } from 'react';

const defaultValue = {
    cardNumber: '',
    isHidden: true,
    cardName: '',
    expirationDate: ['', ''],
    cvv: '',
    isFront: true,
    curFocused: ''
};

export const CardContext = React.createContext(defaultValue);

const cardContextReducer = (state, { type, data }) =>
    type in state ? { ...state, [type]: data } : state;

export const CardContextProvider = ({ children }) => {
    const ctxValue = useReducer(cardContextReducer, defaultValue);

    return <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>;
};

export const useCardContext = (type) => {
    const [state, dispatch] = React.useContext(CardContext);
    return [state[type], (data) => dispatch({ type, data })];
};
