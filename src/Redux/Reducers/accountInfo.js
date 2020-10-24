import { TYPE_ACCOUNT_INFO } from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case TYPE_ACCOUNT_INFO:
            return action.payload;
        default:
            return state;
    }
}