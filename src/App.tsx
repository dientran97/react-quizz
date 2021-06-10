import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import Quizz from './views/quizz';
import ViewResult from './views/result';
import Login from './views/login';
import Home from './views/home';
import ProtectedRoute from './components/protected-route';

function App() {
  const navLinkStyle = { color: 'white' }
  const [login, setLogin] = useState(localStorage.getItem('accessToken'))

  const handleOnLogin = () => {
    setLogin("true")
  }
  const handleOnLogout = () => {
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
              <Link to="/quizz" style={navLinkStyle}>Quizz</Link>
            </li>
            <li>
              <Link to="/view-result" style={navLinkStyle}>View Result</Link>
            </li>
          </ul>
          <div className="login-button">
            <Link to="/login" style={navLinkStyle}>Login</Link>
          </div>
        </nav>
        <Switch>
          <ProtectedRoute path="/quizz" isAuthenticated={login === "true" ? true : false} authenticationPath="/">
            <Quizz />
          </ProtectedRoute>
          <ProtectedRoute path="/view-result" isAuthenticated={login === "true" ? true : false} authenticationPath="/">
            <ViewResult />
          </ProtectedRoute>
          <Route path="/login" >
            <Login onLogin={handleOnLogin} onLogout={handleOnLogout} login={login} />
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
