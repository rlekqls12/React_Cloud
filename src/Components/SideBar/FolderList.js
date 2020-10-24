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

    addFolder = (index, list, children) => {
        let childrenList = children.children;

        if (Array.isArray(childrenList)) {
            let tempContents = this.getDetailList(childrenList);
            for (let i = 0; i < tempContents.length; i++) {
                index[0] = index[0] + 1;
                list.push(<Folder key={index[0]} folderInfo={tempContents[i]} children={children[tempContents[i].folder_code].children}/>);

                if (this.props.foldFolderTree[tempContents[i].folder_code] !== false)
                    this.addFolder(index, list, children[tempContents[i].folder_code]);
            }
        }
    }

    getDetailList = (list) => {
        let detailList = [];

        if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
                detailList.push(this.props.folderTree.tree[1][list[i]]);
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
            // 폴더 추가
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