import { 
    React, Component, connect,
    SORT_TYPES, doListSort
} from 'src/Functions/common.js';
import Folder from './Folder.js';

const mapStateToProps = state => ({
    folderTree: state.folderTree,
    foldFolderTree: state.foldFolderTree
});

class FolderList extends Component {

    // 폴더 트리 순서대로 폴더 추가
    addFolder = (index, list, children) => {
        const { foldFolderTree } = this.props;
        const childrenList = children.children;

        if (Array.isArray(childrenList)) {
            // 폴더들의 상세 정보 가져옴
            const tempContents = this.getDetailList(childrenList);

            for (let i = 0; i < tempContents.length; i++) {
                index[0] = index[0] + 1;
                // 폴더 정보를 담아 리스트에 추가
                list.push(<Folder key={index[0]} folderInfo={tempContents[i]} children={children[tempContents[i].folder_code].children}/>);

                // 폴더가 펼침 상태이면 하위 폴더 가져옴
                if (foldFolderTree[tempContents[i].folder_code] !== false)
                    this.addFolder(index, list, children[tempContents[i].folder_code]);
            }
        }
    }

    // 폴더들의 상세 정보 반환
    getDetailList = (list) => {
        const { tree } = this.props.folderTree;
        let detailList = [];

        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                detailList.push(tree[1][list[i]]);
            }

            let tempContents = doListSort(detailList, SORT_TYPES.TYPE_NAME);
            detailList = tempContents;
        }

        return detailList;
    }

    render() {
        const { tree } = this.props.folderTree;
        const Folders = [];
        const Index = [0];

        if (Array.isArray(tree) && tree.length >= 2) {
            // 모든 폴더 추가
            Index[0] = Index[0] + 1;
            Folders.push(<Folder key={Index[0]} folderInfo={{...tree[1]['/']}}/>);
            this.addFolder(Index, Folders, tree[0]["/"]);
        }

        return (
            <div className="SideBar_folderTree_show">
                {Folders}
            </div>
        );
    }
}

export default connect(
    mapStateToProps, 
    null
)(FolderList);