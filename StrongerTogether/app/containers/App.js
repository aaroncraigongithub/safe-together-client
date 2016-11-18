import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as AuthActions from './../actions/auth';
import {Scene, Router} from 'react-native-router-flux';
import Login from './../components/Login';
import Alert from './../components/Alert';
import Splash from './../components/Splash';
import Contacts from './../components/Contacts';

const RouterWithRedux = connect()(Router);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(AuthActions.loadLocalToken());
  }

  render() {
    return (
      <RouterWithRedux>
        <Scene key='root'>
          <Scene key='splash' component={Splash} title='Stronger Together' initial={true} />
          <Scene key='login' component={Login} title='Login' newAccount={false} />
          <Scene key='register' component={Login} title='Register' newAccount={true} />
          <Scene key='alert' component={Alert} title='Stronger Together' />
          <Scene key='contacts' component={Contacts} title='Add contacts' />
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default connect()(App);
