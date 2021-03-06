import { TYPE_FOLDER_TREE } from '../actionTypes';

// 사이드바에 띄워질 폴더 트리 정보

const initialState = {
    tree: undefined,
    opened: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TYPE_FOLDER_TREE:
            const contents = action.payload;
            if (contents.tree === undefined) contents.tree = state.tree;
            if (contents.opened === undefined) contents.opened = state.opened;
            return {...contents};
        default:
            return state;
    }
}