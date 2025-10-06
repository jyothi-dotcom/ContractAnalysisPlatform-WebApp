import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DocumentUpload from './components/Upload/DocumentUpload';
import Header from './components/Layout/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="container">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
