import { request } from './Axios.js';

const RESULT_CODE = {
    CANT_GET_FOLDER_TREE: 'CANT_GET_FOLDER_TREE'
};

const getFolderTree = async () => {
    let res = await request.get('/show-folder-tree')
        .catch(err => {
            return RESULT_CODE.CANT_GET_FOLDER_TREE;
        });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_GET_FOLDER_TREE;

    return res;
}

export { RESULT_CODE as FOLDER_RESULT_CODE, getFolderTree };