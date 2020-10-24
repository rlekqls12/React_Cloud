import {  
    React, Component, Link, TEXTS, 
    SHA256 
} from 'src/Functions/common.js';
import { checkSpecialChars, onChangePasswordState } from 'src/Functions/Account/account.js';
import { ACCOUNT_RESULT_CODE, postLogin } from 'src/Service/AccountService.js';
import 'src/Resources/CSS/Account.css';
import { Register } from 'src/Components/';

class Login extends Component {
    state = {
        loginId: '',
        loginPw: '',
        loginPwType: 'password',
        loginState: '',
        loginBtnEnabled: true,
        waitLogin: false
    }
    
    preloadRegister = () => {
        Register.preload();
    }

    // 입력창 내용 변경시 state에 적용
    onChangeValue = (element) => {
        let inputText = element.target.value;
    
        // 특수문자 검사
        if (element.target.name === 'loginId' && inputText.length > 0 && inputText.match(checkSpecialChars)) {
            inputText = inputText.replace(checkSpecialChars, '');
            
            this.setState({
              loginState: TEXTS.CAN_INSERT_NORMAL_WORD_TO_ID_INPUT
            });

            element.target.value = inputText;
        }
    
        this.setState({
            [element.target.name]: inputText
        });
    }

    // 비밀번호 패스워드 속성 적용/해제
    onPasswordShow = (element) => {
        this.setState({
            loginPwType: onChangePasswordState(element)
        });
    }

    // 로그인
    executeLogin = async () => {
        const { waitLogin, loginId, loginPw } = this.state;

        if (waitLogin) return;

        if (loginId.length === 0) {
            this.setState({
                loginState: TEXTS.PLEASE_INSERT_ID
            });
            return;
        }

        if (loginPw.length === 0) {
            this.setState({
                loginState: TEXTS.PLEASE_INSERT_PASSWORD
            });
            return;
        }

        // state 바로 적용
        this.setState((state, props) => ({ 
            loginBtnEnabled: false,
            loginState: TEXTS.WAIT_LOGIN,
            waitLogin: true
        }));

        let formData = new FormData();
        formData.append('id', loginId);
        formData.append('password', SHA256(loginPw));

        let result = await postLogin(formData);
        let resultText;

        switch (result) {
            default:
            case ACCOUNT_RESULT_CODE.CANT_CONNECT_DB: resultText = TEXTS.CANT_CONNECT_DB; break;
            case ACCOUNT_RESULT_CODE.NOT_VALID_DATA: resultText = TEXTS.NOT_VALID_DATA; break;
            case ACCOUNT_RESULT_CODE.LOGIN_FAILED: resultText = TEXTS.LOGIN_FAILED; break;

            case ACCOUNT_RESULT_CODE.ALREADY_LOGIN:
                alert(TEXTS.ALREADY_LOGIN);
            // no-fallthrough (리액트 오류 메시지 제거)
            case ACCOUNT_RESULT_CODE.LOGIN_COMPLETE:
                window.location.reload();
                return;
        }

        this.setState({ 
            loginBtnEnabled: true,
            loginState: resultText,
            waitLogin: false
        });
    }

    checkPushEnter = (event) => {
        if (event.keyCode === 13) {
            this.executeLogin();
        }
    }

    render() {
        const {loginPwType, loginState, loginBtnEnabled, waitLogin} = this.state;

        return (
            <div className="Account">
                <div className="Account_wrap">
                <fieldset className="Account_fieldset">
                    <div className="Account_box">
                        <div className="Account_textInput">
                        <input type="text" className="Account_input" id="loginId" name="loginId" placeholder="ID" maxLength="20" onChange={this.onChangeValue} onKeyDown={this.checkPushEnter}></input>
                        </div>
                        <div className="Account_textInput">
                        <input type={loginPwType} className="Account_input" id="loginPw" name="loginPw" placeholder="Password" maxLength="24" onChange={this.onChangeValue} onKeyDown={this.checkPushEnter}></input>
                        <i className="Account_showPassword fa fa-eye fa-lg" onClick={this.onPasswordShow}></i>
                        </div>
                    </div>
                    <div className={["Account_accountState", loginState && "Account_accountState_enabled"].join(' ')}>{loginState}</div>
                    <button type="submit" className={(waitLogin ? "Account_accountg " : "") + "Account_accountBtn Login_button"} onClick={this.executeLogin} disabled={!loginBtnEnabled}>{TEXTS.LOGIN}</button>
                    <div className="Account_appendLogin">
                        <span className="Account_registText" onMouseOver={this.preloadRegister}>
                            <Link to="/register">{TEXTS.REGISTER}</Link>
                        </span>
                    </div>
                </fieldset>
                </div>
            </div>
        );
    }
}

export default Login;