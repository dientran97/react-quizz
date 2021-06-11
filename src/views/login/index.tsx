import React from 'react'
import { useHistory } from 'react-router-dom'
import { Color as AlertColorType } from '@material-ui/lab';
import './index.css'

interface LoginProps {
    onLogin: () => void;
    onLogout: () => void;
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
    const { onLogin, login, onLogout } = props;
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

    const handleLogin = () => {
        if (isEmptyUserNamePassword()) {
            showSnackbar({ message: 'Username and password required.', type: 'error' })
            return
        }
        //Calling Api to check
        if (userName === 'admin' && password === 'admin') {
            showSnackbar({ message: 'Login successfully, redirecting to dashboard.', type: 'success' })
            localStorage.setItem('accessToken', 'true')
            history.replace('/')
            onLogin();
            return
        }
        showSnackbar({ message: 'Username or password is incorrect.', type: 'error' })
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        history.replace('/login')
        onLogout()
    }

    const handleUserNameChange = (e: any) => {
        setUserName(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    return (
        <div className='login'>
            {
                login === "true" ?
                    <input type='button' className='btn' onClick={handleLogout} value='Logout' /> :
                    <div className='login-form'>
                        <label><b>Username</b></label>
                        <input type='text' className='username' placeholder='Username' onChange={handleUserNameChange}></input>
                        <label><b>Password</b></label>
                        <input type='password' className='password' placeholder='Password' onChange={handlePasswordChange}></input>
                        <input type='button' className='btn' onClick={handleLogin} value='Login' />
                        <div className='container'>
                            <input type="checkbox" checked name="remember" /> Remember me
                            <div className="psw"><a href="/login">Forgot password?</a></div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Login
