import { TYPE_FOLD_FOLDER_TREE } from '../actionTypes';

// 사이드바에 있는 폴더 트리에서 하위 폴더 접기 기능 (비)활성화

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