
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { Home, Test } from 'components';
import { appStart } from 'actions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.onStarted({ appStarted: true });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/home" render={(props) => <Home {...props} />} />
          <Route exact path="/test" render={(props) => <Test {...props} />} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  onStarted: data => dispatch(appStart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);