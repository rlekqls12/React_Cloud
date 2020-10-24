import {
    TYPE_MAIN_STATE,
    TYPE_ACCOUNT_INFO,
    TYPE_FOLDER_TREE,
    TYPE_FOLD_FOLDER_TREE
} from './actionTypes.js';

export const updateMainState = contents => ({
    type: TYPE_MAIN_STATE,
    payload: contents
});

export const updateAccountInfo = contents => ({
    type: TYPE_ACCOUNT_INFO,
    payload: contents
});

export const updateFolderTree = contents => ({
    type: TYPE_FOLDER_TREE,
    payload: contents
});

export const changeFoldState = contents => ({
    type: TYPE_FOLD_FOLDER_TREE,
    payload: contents
});