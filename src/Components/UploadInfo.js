import { 
    React, Component,
    TEXTS
} from 'src/Functions/common.js';
import 'src/Resources/CSS/UploadInfo.css';
import uploadImage from 'src/Resources/Image/upload.jpg';

class UploadInfo extends Component {
    render() {
        return (
            <div className="Upload">
                <div className="UploadInner">
                    <img src={uploadImage} alt='upload'></img> <br/> <br/>
                    <span style={{color: 'black'}}>{TEXTS.UPLOAD_INFO_MAIN}</span> <br/>
                    <span style={{fontSize: '18px', color: '#ff7777', fontWeight: 600}}>{TEXTS.UPLOAD_INFO_SUB}</span>
                </div>
            </div>
        );
    }
}
export default UploadInfo;