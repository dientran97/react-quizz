import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import Quiz from './views/quiz';
import ViewResult from './views/result';
import Login from './views/login';
import Home from './views/home';
import ProtectedRoute from './components/protected-route';

const App = () => {
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
            <li>
              <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
            </li>
            <li>
              <Link to="/view-result" style={navLinkStyle}>Result</Link>
            </li>
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
            <h2>Error page</h2>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
