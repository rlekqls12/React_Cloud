import Loadable from 'react-loadable';
import LoadingPage from './LoadingPage.js';

const Loading = () => {
    return LoadingPage();
}

export const Login = Loadable({
    loader: () => import('./Account/Login.js'),
    loading: Loading
});

export const Register = Loadable({
    loader: () => import('./Account/Register.js'),
    loading: Loading
});

export const SideBar = Loadable({
    loader: () => import('./SideBar/SideBar.js'),
    loading: Loading
});

export const ServerError = Loadable({
    loader: () => import('./ServerError.js'),
    loading: Loading
});

export const UploadInfo = Loadable({
    loader: () => import('./UploadInfo.js'),
    loading: Loading
});

export { LoadingPage };