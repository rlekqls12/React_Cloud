import { 
    React, Component, BrowserRouter, Route, Switch, connect,
    TEXTS,
    manageEventListener, DRAG_STATE, DragManager
} from 'src/Functions/common.js';
import {
    ACCOUNT_RESULT_CODE, checkLogin, getAccountInfo
} from 'src/Service/AccountService.js';
import {
    FOLDER_RESULT_CODE, getFolderTree
} from 'src/Service/FolderService.js';
import {
    updateMainState,
    updateAccountInfo,
    updateFolderTree
} from 'src/Redux/actions';
import {
    MAIN_STATE_TYPES
} from 'src/Redux/constants';
import { SideBar, Login, Register, LoadingPage, UploadInfo, ServerError } from './';
import 'src/Resources/CSS/Base.css';
import 'src/Resources/CSS/Icon.css';
import 'src/Resources/CSS/Router.css';

const mapStateToProps = state => ({
    mainState: state.mainState
});

class Router extends Component {
    state = {
        windowWidth: window.innerWidth,
        dragState: DRAG_STATE.NONE,
        dataTransfer: undefined
    };

    /* ------------------------- */
    /* ------- Base Func ------- */
    /* ------------------------- */

    constructor(props) {
        super(props);

        let dragManager = new DragManager();
        dragManager.create();
        dragManager.addDragStateListener(this.onDragStateListener);

        this.state = {
            ...this.state,
            dragManager: dragManager
        }
    }

    componentDidMount = async () => {
        manageEventListener({add: {
            'resize': this.onWindowResize
        }});

        this.loadData();
    };

    componentWillUnmount = () => {
        manageEventListener({remove: {
            'resize': this.onWindowResize
        }});

        const { dragManager } = this.state;
        dragManager.removeDragStateListener(this.onDragStateListener);
        dragManager.destroy();
    };

    /* ------------------------- */
    /* -------- Listener ------- */
    /* ------------------------- */

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        })
    }

    onDragStateListener = (state, dataTransfer) => {
        // ...드래그 상태 변화시 할일...
        this.setState({
            dragState: state,
            dataTransfer: dataTransfer
        })
    }

    /* ------------------------- */
    /* -------- Function ------- */
    /* ------------------------- */

    loadData = async () => {
        let loadFailed = false;

        // 로그인 정보 및 사용자 데이터를 가져온다.
        let logined = await checkLogin();
        let mainState = MAIN_STATE_TYPES.LOGIN;
        if (logined) {
            let accountInfo = await getAccountInfo();
            if (accountInfo === ACCOUNT_RESULT_CODE.CANT_GET_ACCOUNT_INFO) {
                loadFailed = true;
            } else {
                mainState = MAIN_STATE_TYPES.MAIN;
                this.props.updateAccountInfo(accountInfo.data);
            }
        }

        // 폴더 트리 구조를 가져온다.
        let folderTree = await getFolderTree();
        if (folderTree === FOLDER_RESULT_CODE.CANT_GET_FOLDER_TREE) {
            loadFailed = true;
        } else {
            this.props.updateFolderTree(folderTree.data);
        }

        // 사용자 데이터를 하나라도 못 가져왔을 경우
        if (loadFailed) {
            mainState = MAIN_STATE_TYPES.ERROR;
            alert(TEXTS.CANT_GET_USER_DATA);
        }
        
        // 상태 업데이트
        this.props.updateMainState({
            state: mainState,
            errorCode: mainState === MAIN_STATE_TYPES.ERROR ? 500 : 404
        });
    }

    /* ------------------------- */
    /* --------- Render -------- */
    /* ------------------------- */

    render() {
        const { dragState } = this.state;
        const { mainState } = this.props;
        const path = window.location.pathname;
        
        const IS_MAIN_COMPONENT = path === '/' || path.startsWith('/path');

        const state = mainState.state;
        const WAIT_LOGIN = state === MAIN_STATE_TYPES.NONE;
        const NOT_LOGINED = state === MAIN_STATE_TYPES.LOGIN;
        const LOGINED = state === MAIN_STATE_TYPES.MAIN && IS_MAIN_COMPONENT;
        const ERROR = state === MAIN_STATE_TYPES.ERROR;

        const DRAGGING = dragState === DRAG_STATE.DRAGGING;

        let CONTENT_WIDTH = this.state.windowWidth;
        if (LOGINED) CONTENT_WIDTH -= 250;
        
        return(
            <BrowserRouter>
                {/*사이드바*/}
                <div className={(LOGINED ?  "Router_sideBar " : "") + "no-drag"}>
                    {LOGINED && <Route component={SideBar}/>}
                </div>
                {/*메인 화면*/}
                <div className={LOGINED ?  "Router_content" : ""} style={{width: CONTENT_WIDTH}}>
                    <Switch>
                        {/*로딩*/}
                        {WAIT_LOGIN && <Route path="/" exact={true} component={LoadingPage}/>}
                        {WAIT_LOGIN && <Route path="/path" component={LoadingPage}/>}

                        {/*에러들*/}
                        {ERROR && <Route component={ServerError}/>}
                        
                        {/*회원가입*/}
                        <Route path="/register" exact={true} component={Register}/>

                        {/*로그인*/}
                        {NOT_LOGINED && <Route path="/" exact={true} component={Login}/>}
                        {NOT_LOGINED && <Route path="/path" component={Login}/>}

                        {/*메인*/}

                        {/*에러들*/}
                        <Route component={ServerError}/>
                    </Switch>
                </div>
                {LOGINED && DRAGGING && <Route component={UploadInfo}/>}
            </BrowserRouter>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        updateMainState,
        updateAccountInfo,
        updateFolderTree
    }
)(Router);