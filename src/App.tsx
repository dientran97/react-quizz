import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import logo from './images/logo.png';
import error404 from './images/404.png'

import Quiz from './views/quiz';
import ViewResult from './views/result';
import Login from './views/login';
import Home from './views/home';
import ProtectedRoute from './components/protected-route';

const App = () => {
  const [redirect, setRedirect] = useState(false)
  const navLinkStyle = { color: 'white' }
  const [login, setLogin] = useState(localStorage.getItem('accessToken'))
  const [user, setUser] = useState(localStorage.getItem('userName'))

  const handleOnLogin = (userName: any) => {
    setLogin("true")
    setUser(userName)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userName')
    setLogin("false")
  }

  const backHome = () => {
    setRedirect(true)
    renderRedirect()
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  return (
    <>
      <Router>
        <nav className="navbar">
          <div className="logo">
            <Link to="/" style={navLinkStyle}>
              <img src={logo} className='App-logo' alt="logo"></img>
            </Link>
          </div>
          <ul className="nav-link">
            <li>
              <Link to="/" style={navLinkStyle}>Home</Link>
            </li>
            {
              login === 'true' ?
                <>
                  <li>
                    <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
                  </li>
                  <li>
                    <Link to="/view-result" style={navLinkStyle}>Result</Link>
                  </li>
                </> : null
            }
          </ul>
          <div className="login-button">
            {
              login === 'true' ?
                <button className='btn' onClick={handleLogout}> Logout: {user}</button> :
                <Link to="/login" className='btn'>Login</Link>
            }
          </div>
        </nav>
        <Switch>
          <ProtectedRoute path="/quiz" isAuthenticated={login === "true" ? true : false} redirectPath="/">
            <Quiz />
          </ProtectedRoute>
          <ProtectedRoute path="/view-result" isAuthenticated={login === "true" ? true : false} redirectPath="/">
            <ViewResult />
          </ProtectedRoute>
          <Route path="/login" >
            <Login onLogin={handleOnLogin} login={login} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <div className='content'>
              <img src={error404} className='error-logo' alt='logo' />
              <h3>Sorry, you have accessed a non-existing route.</h3>
              <button className='btn' onClick={backHome} >Back Home</button>
              {renderRedirect()}
            </div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
