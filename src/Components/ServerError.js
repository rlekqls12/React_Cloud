import { 
    React, Component, connect
} from 'src/Functions/common.js';

import 'src/Resources/CSS/Error.css';

const mapStateToProps = state => ({
    mainState: state.mainState
});

const code = 404;
const errorMessage = {
    404: 'Page Not Found',
    500: 'Internal Server Error'
};

class ServerError extends Component {
    render() {
        const errorCode = this.props.mainState.errorCode;
        let number = code;
        
        if (errorCode !== undefined)
            number = errorCode;
    
        return (
            <div className="Body">
                <div className="Number">
                    {errorMessage[number] === undefined ? code : number}
                </div>
                <div className="Other">
                    {errorMessage[number] === undefined ? errorMessage[code] : errorMessage[number]}
                </div>
            </div>
        );
    }
}
export default connect(
    mapStateToProps, 
    null
)(ServerError);