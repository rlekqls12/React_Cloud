import {
    TYPE_MAIN_STATE,
    TYPE_ACCOUNT_INFO,
    TYPE_FOLDER_TREE,
    TYPE_FOLD_FOLDER_TREE
} from './actionTypes.js';

// 메인 컴포넌트 변경
export const updateMainState = contents => ({
    type: TYPE_MAIN_STATE,
    payload: contents
});

// 로그인한 유저 정보
export const updateAccountInfo = contents => ({
    type: TYPE_ACCOUNT_INFO,
    payload: contents
});

// 사이드바에 띄워질 폴더 트리 정보
export const updateFolderTree = contents => ({
    type: TYPE_FOLDER_TREE,
    payload: contents
});

// 사이드바에 있는 폴더 트리에서 하위 폴더 접기 기능 (비)활성화
export const changeFoldState = contents => ({
    type: TYPE_FOLD_FOLDER_TREE,
    payload: contents
});