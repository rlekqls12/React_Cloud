import { TYPE_MAIN_STATE } from '../actionTypes';
import { MAIN_STATE_TYPES } from '../constants';

const initialState = {
    state: MAIN_STATE_TYPES.NONE,
    errorCode: 404
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TYPE_MAIN_STATE:
            const contents = action.payload;
            if (contents.state === undefined) contents.state = state.state;
            if (contents.errorCode === undefined) contents.errorCode = state.errorCode;
            return {...contents};
        default:
            return state;
    }
}