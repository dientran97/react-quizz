import React from 'react'
import { useHistory } from 'react-router'
import './index.css'

interface LoginProps {
    onLogin: () => void;
    onLogout: () => void;
    login: String | null;
}

const Login = (props: LoginProps) => {
    let history = useHistory()
    const { onLogin, login, onLogout } = props;

    let handleLogin = () => {
        localStorage.setItem("accessToken", "true")
        history.replace('/')
        onLogin()
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        history.replace('/login')
        onLogout()
    }
    return (
        <div className='login'>
            {login === "true" ?
                <input type='button' className='btn' onClick={handleLogout} value='Logout' /> :
                <input type='button' className='btn' onClick={handleLogin} value='Login' />}
        </div>
    )
}

export default Login
