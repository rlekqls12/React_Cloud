import { 
    React, Component, connect,
    TEXTS,
    getSizeText
} from 'src/Functions/common.js';
import { changeFoldState } from '../../Redux/actions';

const mapStateToProps = state => ({
    accountInfo: state.accountInfo,
    foldFolderTree: state.foldFolderTree
});

class Folder extends Component {
    static defaultProps = {
        folderInfo: {
            folder_code: '',
            folder_name: '',
            folder_size: 0,
            depth: 0
        },
        children: []
    }

    onMovePath = () => {
        // 경로 이동
        const { folder_code } = this.props.folderInfo;
        window.location.href = '/path/' + (folder_code === '/' ? '' : folder_code);
    }

    changeFoldState = () => {
        const { folderInfo, foldFolderTree } = this.props;
        const beforeState = foldFolderTree[folderInfo.folder_code];

        this.props.changeFoldState({
            target: folderInfo.folder_code,
            folded: (beforeState === undefined || beforeState === true ? false : true)
        })
    }

    render() {
        const { accountInfo, folderInfo, foldFolderTree } = this.props;

        // 최상위 폴더 이름 설정
        if (folderInfo.folder_code === "/") folderInfo.folder_name = accountInfo.id + TEXTS.WHOS_STORAGE;

        // 용량 표시 계산
        let folderSize = getSizeText(folderInfo.folder_size).join(' ');

        // 자식 보유 여부
        let haveChildren = this.props.children.length !== 0;

        // 좌측 패딩 값
        let leftPadding = 20 * folderInfo.depth;
        if (haveChildren) leftPadding -= 21.5;

        // 하위 폴더 활성화 상태
        let folded = !(foldFolderTree[folderInfo.folder_code] === false);
        let foldedIcon = '▼';
        if (!folded) foldedIcon = '▶';

        return (
            <div style={{marginLeft: leftPadding + "px"}}>
                {haveChildren && <span className='SideBar_folderTree_show_folder_folded' onClick={this.changeFoldState}>{foldedIcon}&nbsp;</span>}
                <i className="SideBar_folderTree_show_folder fa fa-folder"  title={folderInfo.folder_name + ` (${folderSize})`} onClick={this.onMovePath}>
                    <span className="SideBar_folderTree_show_text">
                        {folderInfo.folder_name}
                    </span>
                </i>
                <br/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        changeFoldState
    }
)(Folder);