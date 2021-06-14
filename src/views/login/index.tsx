import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Alert, Color as AlertColorType } from '@material-ui/lab';
import './index.css'
import { Snackbar } from '@material-ui/core';

import logo from '../../images/logo.png';

interface LoginProps {
    onLogin: (userName: any) => void;
    login: String | null;
}

interface SnackbarOptions {
    open?: boolean
    type?: AlertColorType
    message?: string
    duration?: number
}

const Login = (props: LoginProps) => {
    let history = useHistory()
    const { onLogin, login } = props;
    const [userName, setUserName] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const isEmptyUserNamePassword = () => {
        if (userName.trim() === '' || password.trim() === '') {
            return true;
        }
        return false;
    }

    const [stateSnackbar, setStateSnackbar] = React.useState<SnackbarOptions>({
        open: false,
        type: 'error' as AlertColorType,
        message: '',
        duration: 3000
    });


    const showSnackbar = (options: SnackbarOptions) => {
        setStateSnackbar({ ...stateSnackbar, ...options, open: true });
    }

    const hideSnackbar = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    }

    const handleLogin = () => {
        if (isEmptyUserNamePassword()) {
            showSnackbar({ message: 'Username and password required.', type: 'error' })
            return
        }
        //Calling Api to check
        if (userName === 'admin' && password === 'admin') {
            showSnackbar({ message: 'Login successfully, redirecting to dashboard.', type: 'success' })
            localStorage.setItem('accessToken', 'true')
            localStorage.setItem('userName', userName)
            history.replace('/')
            onLogin(userName);
            return
        }
        showSnackbar({ message: 'Username or password is incorrect.', type: 'error' })
    }

    const handleUserNameChange = (e: any) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <div className='login'>
                {
                    login === "true" ?
                        <Redirect to='/' /> :
                        <>
                            <div className='login-form'>
                                <div>
                                    <img src={logo} className='logo' alt='logo' height='200px' width='200px' />
                                    <h1 className='app-name'>QUIZ APP</h1>
                                </div>
                                <label>Username</label>
                                <input type='text' className='username' placeholder='Username' onChange={handleUserNameChange}></input>
                                <label>Password</label>
                                <input type='password' className='password' placeholder='Password' onChange={handlePasswordChange}></input>
                                <input type='button' className='btn login-btn' onClick={handleLogin} value='Login' />
                                <div className='container'>
                                    <input type="checkbox" name="remember" /> Remember me
                                    <div className="psw"><a href="/login">Forgot password?</a></div>
                                </div>
                            </div>
                        </>
                }
            </div>

            <Snackbar open={stateSnackbar.open} autoHideDuration={stateSnackbar.duration} onClose={hideSnackbar}>
                <Alert onClose={hideSnackbar} severity={stateSnackbar.type}>
                    {stateSnackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login
