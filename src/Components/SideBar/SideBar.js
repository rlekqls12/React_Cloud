import { 
    React, Component, connect, Motion, spring,
    TEXTS,
    getSizeText, decimalFixed
} from 'src/Functions/common.js';
import {
    ACCOUNT_RESULT_CODE, doLogout
} from 'src/Service/AccountService.js';
import {
    updateMainState,
    updateFolderTree
} from 'src/Redux/actions';
import {
    MAIN_STATE_TYPES
} from 'src/Redux/constants';
import FolderList from './FolderList.js';
import 'src/Resources/CSS/SideBar.css';

const mapStateToProps = state => ({
    mainState: state.mainState,
    accountInfo: state.accountInfo,
    folderTree: state.folderTree
});

class SideBar extends Component {
    state = {
        userStorageInfo: {
            "useStorage": '0 KB',
            "fullStorage": '0 KB',
            "restStorage": '0 KB',
            "usage": 0
        }
    }

    componentDidMount = () => {
        // 사용자 정보 계산 및 표시
        this.onUserInfoUpdate();
    }

    onUserInfoUpdate = () => {
        // 표시할 유저 정보 업데이트
        const { accountInfo } = this.props;
        if (accountInfo === undefined) return;

        if (accountInfo.fullStorage !== 0) {
            // 용량 크기를 적당한 크기로 절삭
            const useStorage = getSizeText(accountInfo.useStorage);
            const fullStorage = getSizeText(accountInfo.fullStorage);
            const restStorage = getSizeText(accountInfo.fullStorage - accountInfo.useStorage);

            // 사용량 계산
            let usage = (accountInfo.useStorage / accountInfo.fullStorage) * 100;
            if (usage > 100) usage = 100;
            if (usage < 0) usage = 0;

            // 소수점 확인
            useStorage[0] = decimalFixed(useStorage[0], 2);
            fullStorage[0] = decimalFixed(fullStorage[0], 2);
            restStorage[0] = decimalFixed(restStorage[0], 4);

            // usage를 제외한 나머지 값 적용
            const tempUserInfo = {
                "useStorage": useStorage.join(' '),
                "fullStorage": fullStorage.join(' '),
                "restStorage": restStorage.join(' '),
                "usage": 0
            };
            this.setState({
                userStorageInfo: tempUserInfo
            });

            // 애니메이션 효과를 위해 usage를 0.01초 뒤에 적용
            setTimeout(() => {
                tempUserInfo.usage = usage;
                this.setState({
                    userStorageInfo: tempUserInfo
                });
            }, 10);
        }
    }

    // 폴더 영역 펼침 / 접음
    onFolderTreeToggle = () => {
        this.props.updateFolderTree({
            opened: !this.props.folderTree.opened
        })
    }

    onLogout = async () => {
        // 로그아웃
        const logout = await doLogout();
        
        switch(logout) {
            default:
            case ACCOUNT_RESULT_CODE.CANT_LOGOUT:
                alert(TEXTS.CANT_LOGOUT);
            break;
            case ACCOUNT_RESULT_CODE.ALREADY_LOGOUT:
                alert(TEXTS.ALREADY_LOGOUT);
                window.location.reload();
                return;
            case ACCOUNT_RESULT_CODE.LOGOUT_COMPLETE:
                this.props.updateMainState({
                    state: MAIN_STATE_TYPES.LOGIN
                });
            break;
        }
    }

    render() {
        const { userStorageInfo } = this.state;
        const { accountInfo, folderTree } = this.props;
        const folderTreeOpened = folderTree.opened;

        return (
            <div className="SideBar">
                {/*가름선*/}
                <div className="SideBar_splitBar"></div>
                {/*유저 정보*/}
                <div className="SideBar_userInfo">
                    {accountInfo.id} &nbsp;
                    <span onClick={this.onLogout} className="SideBar_userInfo_logout">{TEXTS.LOGOUT}</span>
                </div>
                {/*남은 용량*/}
                <div className="SideBar_remainSize">
                    {userStorageInfo.useStorage} / {userStorageInfo.fullStorage}
                    <Motion defaultStyle={{width: 0}} style={{width: spring(userStorageInfo.usage)}}>
                        {
                            value => 
                            <div>
                                <div className="SideBar_remainSize_back">
                                    <div className="SideBar_remainSize_use" style={{"width": `${value.width}%`}}></div>
                                </div>
                                <div className="SideBar_remainSize_percent" style={{transform: `translateX(${(value.width < 8 ? -40 : (value.width > 92 ? 40 : value.width - 50))}%)`}}>({`${value.width.toFixed(2)}%`})</div>
                            </div>
                        }
                    </Motion>
                    {TEXTS.REST_STORAGE} : {userStorageInfo.restStorage}
                </div>
                {/*폴더 트리*/}
                <div className="SideBar_folderTree">
                    {TEXTS.FOLDER}<i onClick={this.onFolderTreeToggle} className={"SideBar_folderTree_toggle fa " + (folderTreeOpened ? "fa-angle-double-up" : "fa-angle-double-down")}></i>
                    <div className="SideBar_folderTree_list" style={{height: folderTreeOpened ? "250px" : "0", overflow: folderTreeOpened ? "scroll" : "hidden"}}>
                        <FolderList/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, 
    {
        updateMainState, 
        updateFolderTree
    }
)(SideBar);