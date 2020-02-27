export const initalState = {};
export const DEFAULT = 'DEFAULT';

export const adminPayload = payload => ({
    type:DEFAULT,
    payload
});


export default (prevState = initalState, action) => {
    const {type, payload} = action;
    switch(type){
        case DEFAULT:
            return {
                ...prevState,
                ...payload
            }
        default:
            return prevState
    }
} 