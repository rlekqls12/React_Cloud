import { combineReducers } from 'redux';

import mainState from './mainState';            // 메인 컴포넌트 변경시 사용
import accountInfo from './accountInfo';        // 로그인한 유저 정보
import folderTree from './folderTree';          // 사이드바에 띄워질 폴더 트리 정보
import foldFolderTree from './foldFolderTree';  // 사이드바에 있는 폴더 트리에서 하위 폴더 접기 기능 (비)활성화

export default combineReducers({ 
    mainState,
    accountInfo,
    folderTree,
    foldFolderTree
});