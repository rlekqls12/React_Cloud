import { 
    React, Component, connect,
    TEXTS
} from 'src/Functions/common.js';
import 'src/Resources/CSS/ContentsMain.css';

const mapStateToProps = state => ({
    accountInfo: state.accountInfo,
    folderTree: state.folderTree
});

class ContentsMain extends Component {

    render() {
        const { folderTree } = this.props;
        const path = window.location.pathname.replace('/path/', '').replace('/path', '');

        // 임시로 폴더 이름 표시
        let folderName;
        if (path.length === 0) {
            const { accountInfo } = this.props;
            folderName = accountInfo.id + TEXTS.WHOS_STORAGE;
        } else {
            folderName = folderTree.tree[1][path].folder_name;
        }

        return(
            <div className="ContentsMain">
                <div className="ContentsMain_path no-drag">
                {/* 현재 폴더 경로 표시 */}
                {folderName}
                </div>
                {/* 폴더 내의 폴더/파일들 표시하는 컴포넌트 추가 */}
                {/* 팝업창 관리하는 컴포넌트 추가 */}
            </div>
        )
    }
}

export default connect(
    mapStateToProps, 
    null
)(ContentsMain);