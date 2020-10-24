import { TYPE_FOLD_FOLDER_TREE } from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case TYPE_FOLD_FOLDER_TREE:
            const contents = action.payload;
            if (contents.target === undefined || contents.folded === undefined) return state;
            state[contents.target] = contents.folded;
            return {...state};
        default:
            return state;
    }
}