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

const checkLogin = async () => {
    let res = await request.get('/login')
        .catch(err => {
            return false;
        });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return false;
    
    let resData = res.data.toLowerCase();
    if (resData === 'already login') {
        return true
    };

    return false;
}

const getAccountInfo = async () => {
    let res = await request.get('/')
        .catch(err => {
            return RESULT_CODE.CANT_GET_ACCOUNT_INFO;
        });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_GET_ACCOUNT_INFO;

    return res;
}

const postLogin = async (param) => {
    let res = await request.post('/login', param)
        .catch(err => {
            return RESULT_CODE.CANT_CONNECT_DB;
        });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_CONNECT_DB;
    
    let resData = res.data.toLowerCase();
    switch (resData) {
        default:
        case 'login failed': return RESULT_CODE.LOGIN_FAILED;
        case 'can\'t connect db': return RESULT_CODE.CANT_CONNECT_DB;
        case 'not valid data': return RESULT_CODE.NOT_VALID_DATA;
        case 'already login': return RESULT_CODE.ALREADY_LOGIN;
        case 'login complete': return RESULT_CODE.LOGIN_COMPLETE;
    }
}

const postRegister = async (param) => {
    let res = await request.post('/register', param)
        .catch(err => {
            return RESULT_CODE.CANT_CONNECT_DB;
        });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.CANT_CONNECT_DB;
    
    let resData = res.data.toLowerCase();
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

const doLogout = async () => {
    let res = await request.get("/logout")
            .catch(err => {
                return RESULT_CODE.LOGOUT_FAILED
            });

    if (res === undefined || res.status !== 200 || res.data === 'Error') return RESULT_CODE.LOGOUT_FAILED;

    let resData = res.data.toLowerCase();
    switch (resData) {
        default: return RESULT_CODE.LOGOUT_FAILED;
        case 'already logout': return RESULT_CODE.ALREADY_LOGOUT;
        case 'logout complete': return RESULT_CODE.LOGOUT_COMPLETE;
    }
}

export { RESULT_CODE as ACCOUNT_RESULT_CODE, checkLogin, getAccountInfo, postLogin, postRegister, doLogout };