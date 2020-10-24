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
            "useStorage": 0,
            "fullStorage": 0,
            "restStorage": 0,
            "useStorageText": 'KB',
            "fullStorageText": 'KB',
            "restStorageText": 'KB',
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
            let useStorage = getSizeText(accountInfo.useStorage);
            let fullStorage = getSizeText(accountInfo.fullStorage);
            let restStorage = getSizeText(accountInfo.fullStorage - accountInfo.useStorage);

            // 사용량 계산
            let usage = (accountInfo.useStorage / accountInfo.fullStorage) * 100;
            if (usage > 100) usage = 100;
            if (usage < 0) usage = 0;

            // 소수점 확인
            useStorage[0] = decimalFixed(useStorage[0], 2);
            fullStorage[0] = decimalFixed(fullStorage[0], 2);
            restStorage[0] = decimalFixed(restStorage[0], 4);

            // usage를 제외한 나머지 값 적용
            let tempUserInfo = {
                "useStorage": useStorage[0],
                "fullStorage": fullStorage[0],
                "restStorage": restStorage[0],
                "useStorageText": useStorage[1],
                "fullStorageText": fullStorage[1],
                "restStorageText": restStorage[1],
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

    onFolderTreeToggle = () => {
        this.props.updateFolderTree({
            opened: !this.props.folderTree.opened
        })
    }

    onLogout = async () => {
        // 로그아웃
        let logout = await doLogout();
        
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

        const useStorage = `${userStorageInfo.useStorage || 0} ${userStorageInfo.useStorageText || "MB"}`;
        const fullStorage = `${userStorageInfo.fullStorage || 0} ${userStorageInfo.fullStorageText || "MB"}`;
        const restStorage = `${userStorageInfo.restStorage || 0} ${userStorageInfo.restStorageText || "MB"}`;
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
                    {useStorage} / {fullStorage}
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
                    {TEXTS.REST_STORAGE} : {restStorage}
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