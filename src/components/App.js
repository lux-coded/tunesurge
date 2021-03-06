import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history.js';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Nav from './Nav/Nav.js';
import { getLoginCode, getAccessToken } from '../actions/authActions.js';

const code = new URLSearchParams(window.location.search).get('code');

class App extends React.Component {

  componentDidMount() {
    const savedAccessToken = localStorage.getItem('accessToken');
    this.props.getLoginCode(code);
    this.props.getAccessToken(savedAccessToken);
  }

  render() {
    return (
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path='/' exact component={code ? Dashboard : Login} />
          <Route path='/profile' exact component={Dashboard} />
          <Route path='/search/:query' exact component={Dashboard} />
          <Route path='/artists/:id' exact component={Dashboard} />
          <Route path='/album/:id' exact component={Dashboard} />
          <Route path='/playlist/:id' exact component={Dashboard} />
        </Switch>
      </Router>
    );
  }
};

export default connect(
  null,
  {getLoginCode, getAccessToken}
)
(App);
