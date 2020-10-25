import { request } from './Axios.js';

const RESULT_CODE = {
    CANT_CONNECT_DB: 'CANT_CONNECT_DB',
    CANT_FIND_KEY: 'CANT_FIND_KEY',
    CANT_GET_ACCOUNT_INFO: 'CANT_GET_ACCOUNT_INFO',
    NOT_VALID_DATA: 'NOT_VALID_DATA',
    DUPLICATE_ID: 'DUPLICATE_ID',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT_FAILED: 'LOGOUT_FAILED',

    ALREADY_LOGIN: 'ALREADY_LOGIN',
    ALREADY_LOGOUT: 'ALREADY_LOGOUT',
    LOGIN_COMPLETE: 'LOGIN_COMPLETE',
    LOGOUT_COMPLETE: 'LOGOUT_COMPLETE',
    REGIST_COMPLETE: 'REGIST_COMPLETE'

};

/**
 * 서버가 없어서 더미데이터 추가
 */

/**
 * 로그인 상태인지 확인
 * @returns {boolean} true / false
 */
const checkLogin = async () => {
    return true;
    // eslint-disable-next-line
    const res = await request.get('/login')
        .catch(err => {
            return false;
        });
    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return false;
    
    const resData = res.data.toLowerCase();
    if (resData === 'already login') {
        return true
    };
    // eslint-disable-next-line
    return false;
}

/**
 * 사용자 정보 가져오기
 * @returns {object|string} 
 * {
 *      data: {
 *          id: 아이디,
 *          useStorage: 저장소 사용량,
 *          fullStorage: 저장소 용량
 *      }
 * }
 * or ACCOUNT_RESULT_CODE
 */
const getAccountInfo = async () => {
    return {
        data: {
            id: 'tester',
            useStorage: 512000000000,
            fullStorage: 1024000000000
        }
    };
    // eslint-disable-next-line
    const res = await request.get('/')
        .catch(err => {
            return RESULT_CODE.CANT_GET_ACCOUNT_INFO;
        });

    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_GET_ACCOUNT_INFO;

    return res;
}

/**
 * 로그인
 * @param {FormData} param id, password(SHA256)
 * @returns {String} ACCOUNT_RESULT_CODE
 */
const postLogin = async (param) => {
    return RESULT_CODE.LOGIN_COMPLETE;
    // eslint-disable-next-line
    const res = await request.post('/login', param)
        .catch(err => {
            return RESULT_CODE.CANT_CONNECT_DB;
        });

    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_CONNECT_DB;
    
    const resData = res.data.toLowerCase();
    switch (resData) {
        default:
        case 'login failed': return RESULT_CODE.LOGIN_FAILED;
        case 'can\'t connect db': return RESULT_CODE.CANT_CONNECT_DB;
        case 'not valid data': return RESULT_CODE.NOT_VALID_DATA;
        case 'already login': return RESULT_CODE.ALREADY_LOGIN;
        case 'login complete': return RESULT_CODE.LOGIN_COMPLETE;
    }
}

/**
 * 회원가입
 * @param {FormData} param id, password(SHA256), verifiedKey
 * @returns {String} ACCOUNT_RESULT_CODE
 */
const postRegister = async (param) => {
    return RESULT_CODE.REGIST_COMPLETE;
    // eslint-disable-next-line
    const res = await request.post('/register', param)
        .catch(err => {
            return RESULT_CODE.CANT_CONNECT_DB;
        });

    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_CONNECT_DB;
    
    const resData = res.data.toLowerCase();
    switch (resData) {
        default:
        case 'can\'t connect db': return RESULT_CODE.CANT_CONNECT_DB;
        case 'can\'t find key': return RESULT_CODE.CANT_FIND_KEY;
        case 'not valid data': return RESULT_CODE.NOT_VALID_DATA;
        case 'duplicate id': return RESULT_CODE.DUPLICATE_ID;
        case 'already login': return RESULT_CODE.ALREADY_LOGIN;
        case 'regist complete': return RESULT_CODE.REGIST_COMPLETE;
    }
}

/**
 * 로그아웃
 * @returns {String} ACCOUNT_RESULT_CODE
 */
const doLogout = async () => {
    return RESULT_CODE.LOGOUT_COMPLETE;
    // eslint-disable-next-line
    const res = await request.get("/logout")
            .catch(err => {
                return RESULT_CODE.LOGOUT_FAILED
            });

    // eslint-disable-next-line
    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.LOGOUT_FAILED;

    const resData = res.data.toLowerCase();
    switch (resData) {
        default: return RESULT_CODE.LOGOUT_FAILED;
        case 'already logout': return RESULT_CODE.ALREADY_LOGOUT;
        case 'logout complete': return RESULT_CODE.LOGOUT_COMPLETE;
    }
}

export { RESULT_CODE as ACCOUNT_RESULT_CODE, checkLogin, getAccountInfo, postLogin, postRegister, doLogout };