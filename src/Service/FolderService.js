import { request } from './Axios.js';

const RESULT_CODE = {
    CANT_GET_FOLDER_TREE: 'CANT_GET_FOLDER_TREE'
};

/**
 * 서버가 없어서 더미데이터 추가
 */

 /**
  * 폴더 트리 가져오기
  * @returns {object|FOLDER_RESULT_CODE}
  * {
  *     data: {
  *         tree: [
  *             {
  *                 폴더 트리 구조
  *             },
  *             {
  *                 폴더 정보
  *             }
  *         ]
  *     }
  * }
  * or FOLDER_RESULT_CODE 
  */
const getFolderTree = async () => {
    return {
        data: {
            tree: [
                {
                    '/': {
                        children: ['t001', 't002'],
                        't001': {
                            children: ['t001-01'],
                            't001-01': {
                                children: []
                            }
                        },
                        't002': {
                            children: []
                        }
                    }
                },
                {
                    '/': {
                        folder_code: '/',
                        folder_name: '',
                        folder_size: 512000000000,
                        depth: 0
                    },
                    't001': {
                        folder_code: 't001',
                        folder_name: '테스트 폴더 1',
                        folder_size: 256000000000,
                        depth: 1
                    },
                    't001-01': {
                        folder_code: 't001-01',
                        folder_name: '테스트 폴더 1-1',
                        folder_size: 256000000000,
                        depth: 2
                    },
                    't002': {
                        folder_code: 't002',
                        folder_name: '테스트 폴더 2',
                        folder_size: 256000000000,
                        depth: 1
                    }
                }
            ]
        }
    };
    // eslint-disable-next-line
    const res = await request.get('/show-folder-tree')
        .catch(err => {
            return RESULT_CODE.CANT_GET_FOLDER_TREE;
        });

    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_GET_FOLDER_TREE;

    return res;
}

export { RESULT_CODE as FOLDER_RESULT_CODE, getFolderTree };