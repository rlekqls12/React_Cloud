import {  
    React, TEXTS
} from 'src/Functions/common.js';
import 'src/Resources/CSS/LoadingPage.css';

const LoadingPage = () => {
    return (
        <div className="Loading">
            <div className="Loading_loader"></div>
            <label className="Loading_text">{TEXTS.LOADING}</label>
        </div>
    );
}

export default LoadingPage;