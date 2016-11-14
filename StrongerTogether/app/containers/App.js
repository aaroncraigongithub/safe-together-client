import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {Scene, Router} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Login from './../components/Login';
import Alert from './../components/Alert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    paddingLeft: 10,
    paddingRight: 10
  },
  header: {
    fontSize:   30,
    fontWeight: 'bold'
  },
  label: {
    fontWeight: 'bold'
  },
  textInput: {
    height: 40
  },
  secondaryLink: {
    marginTop: 10,
    textAlign: 'center'
  }
});

const RouterWithRedux = connect()(Router);

class App extends Component {
  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="login" component={Login} styles={styles} title="Login" newAccount={false} />
          <Scene key="register" component={Login} styles={styles} title="Register" newAccount={true} />
          <Scene key="alert" component={Alert} styles={styles} title="Alert" />
        </Scene>
      </RouterWithRedux>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
