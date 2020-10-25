import { 
    React, Component, TEXTS, 
    SHA256
} from 'src/Functions/common.js';
import { checkSpecialChars, onChangePasswordState } from 'src/Functions/Account/account.js';
import { ACCOUNT_RESULT_CODE, checkLogin, postRegister } from 'src/Service/AccountService.js';
import 'src/Resources/CSS/Account.css';

class Register extends Component {
    state = {
        registId: '',
        registPw: '',
        registPwType: 'password',
        registCPw: '',
        registCPwType: 'password',
        registKey: '',
        registState: '',
        registBtnEnabled: true,
        waitRegister: false
    }

    componentDidMount = () => {
        // 로그인 중이라면 메인 페이지로 이동
        checkLogin(() => {
            window.location.href = '/';
        });
    }

    // 입력창 내용 변경시 state에 적용
    onChangeValue = (e) => {
        const inputName = e.target.name;
        let inputText = e.target.value;

        // 특수문자 검사
        if (['registId', 'registKey'].indexOf(inputName) !== -1 && inputText.length > 0 && inputText.match(checkSpecialChars)) {
            inputText = inputText.replace(checkSpecialChars, '');
            
            if (inputName === 'registId')
                this.setState({
                    registState: TEXTS.CAN_INSERT_NORMAL_WORD_TO_ID_INPUT
                });
                
            if (inputName === 'registKey')
                this.setState({
                    registState: TEXTS.CAN_INSERT_NORMAL_WORD_TO_KEY_INPUT
                });

            e.target.value = inputText;
        }

        this.setState({
            [e.target.name]: inputText
        });
    }

    // 비밀번호 패스워드 속성 적용/해제
    onPasswordShow = (element) => {
        const classes = element.target.className;

        let inputType;
        if (classes.indexOf('pw1') !== -1) inputType = 'registPwType';
        else inputType = 'registCPwType';

        this.setState({
            [inputType]: onChangePasswordState(element)
        });
    }

    // 회원가입
    executeRegister = async () => {
        const { waitRegister, registId, registPw, registCPw, registKey } = this.state;

        if (waitRegister) return;

        if (registId.length === 0) {
            this.setState({
                registState: TEXTS.PLEASE_INSERT_ID
            });
            return;
        }

        if (registPw.length === 0) {
            this.setState({
                registState: TEXTS.PLEASE_INSERT_PASSWORD
            });
            return;
        }

        if (registCPw.length === 0) {
            this.setState({
                registState: TEXTS.PLEASE_INSERT_CHECK_PASSWORD
            });
            return;
        }

        if (registKey.length === 0) {
            this.setState({
                registState: TEXTS.PLEASE_INSERT_KEY
            });
            return;
        }

        if (registPw !== registCPw) {
            this.setState({
                registState: TEXTS.NOT_SAME_PASSWORD
            })
            return;
        }

        // 다중 처리 방지를 위해 state 바로 적용
        this.setState((state, props) => ({ 
            registBtnEnabled: false,
            registState: TEXTS.WAIT_REGISTER,
            waitRegister: true
        }));

        const formData = new FormData();
        formData.append('id', registId);
        formData.append('password', SHA256(registPw));
        formData.append('verifiedKey', registKey);

        const result = await postRegister(formData);
        let resultText;

        switch (result) {
            default:
            case ACCOUNT_RESULT_CODE.CANT_CONNECT_DB: resultText = TEXTS.CANT_CONNECT_DB; break;
            case ACCOUNT_RESULT_CODE.CANT_FIND_KEY: resultText = TEXTS.CANT_FIND_KEY; break;
            case ACCOUNT_RESULT_CODE.NOT_VALID_DATA: resultText = TEXTS.NOT_VALID_DATA; break;
            case ACCOUNT_RESULT_CODE.DUPLICATE_ID: resultText = TEXTS.DUPLICATE_ID; break;

            case ACCOUNT_RESULT_CODE.ALREADY_LOGIN:
                alert(TEXTS.ALREADY_LOGIN);
                window.location.href = '/';
                return;
            case ACCOUNT_RESULT_CODE.REGIST_COMPLETE:
                alert(TEXTS.REGISTER_COMPLETE);
                window.location.href = '/';
                return;
        }

        this.setState({ 
            registBtnEnabled: true,
            registState: resultText,
            waitRegister: false
        });
    }

    render() {
        const { registPwType, registCPwType, registState, registBtnEnabled, waitRegister } = this.state;

        return (
            <div className="Account">
                <div className="Account_wrap">
                    <fieldset className="Account_fieldset">
                    <div className="Account_box">
                        <div className="Account_textInput">
                            <input type="text" className="Account_input" id="registId" name="registId" placeholder="ID" maxLength="20" onChange={this.onChangeValue}></input>
                        </div>
                        <div className="Account_textInput">
                            <input type={registPwType} className="Account_input" id="registPw" name="registPw" placeholder="Password" maxLength="24" onChange={this.onChangeValue}></input>
                            <i className="Account_showPassword fa fa-eye fa-lg pw1" onClick={this.onPasswordShow}></i>
                        </div>
                        <div className="Account_textInput">
                            <input type={registCPwType} className="Account_input" id="registCPw" name="registCPw" placeholder="Confirm Password" maxLength="24" onChange={this.onChangeValue}></input>
                            <i className="Account_showPassword fa fa-eye fa-lg pw2" onClick={this.onPasswordShow}></i>
                        </div>
                        <div className="Account_textInput">
                            <input type="text" className="Account_input" id="registKey" name="registKey" placeholder="Key" maxLength="6" onChange={this.onChangeValue}></input>
                        </div>
                    </div>
                <div className={["Account_accountState", registState && "Account_accountState_enabled"].join(' ')}>{registState}</div>
                <button type="submit" className={(waitRegister ? "Account_accounting " : "") + "Account_accountBtn Register_button"} onClick={this.executeRegister} disabled={!registBtnEnabled}>{TEXTS.DONE}</button>
              </fieldset>
            </div>
          </div>
        );
    }
}

export default Register;