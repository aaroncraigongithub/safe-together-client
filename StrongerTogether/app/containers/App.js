import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as UserActions from './../actions/user';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Platform, Linking } from 'react-native';
import Login from './../components/Login';
import Alert from './../components/Alert';
import Splash from './../components/Splash';
import Contacts from './../components/Contacts';
import ConfirmFriend from './../components/ConfirmFriend';
import ConfirmAccount from './../components/ConfirmAccount';

const RouterWithRedux = connect()(Router);

class App extends Component {
  componentDidMount() {
    this.checkInitialRoute().then(route => {
      if (route) {
        this.goToRoute(route);
      } else {
        this.props.dispatch(UserActions.loadUser());
      }
    });

    Linking.addEventListener('url', this.handleOpenURL.bind(this));
  }

  checkInitialRoute() {
    return Linking.getInitialURL().then(url => {
      if (url) {
        return this.urlToRoute(url);
      }

      return null;
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    this.goToRoute(this.urlToRoute(event.url));
  }

  urlToRoute(url) {
    const path = url.replace(/.*?:\/\//g, '');

    return path.replace('stronger-together.herokuapp.com/', '').split('/');
  }

  goToRoute(args) {
    if (args[0] === 'users' && args[1] === 'confirm') {
      Actions.confirmAccount({token: args[2], type: 'replace'});
    }

    if (args[0] === 'friends' && args[1] === 'confirm') {
      Actions.confirmFriend({token: args[2], type: 'replace'});
    }
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
          <Scene key='confirmFriend' component={ConfirmFriend} title='Invitation accepted' />
          <Scene key='confirmAccount' component={ConfirmAccount} title='Account verified' />
        </Scene>
      </RouterWithRedux>
    );
  }
}

export default connect()(App);
