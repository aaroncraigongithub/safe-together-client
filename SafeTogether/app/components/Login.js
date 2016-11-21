import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as AuthActions from './../actions/auth';
import { ScrollView, View, TextInput, Button } from 'react-native';
import BasicText from './BasicText';
import AppInfo from './AppInfo';
import AsyncButton from './AsyncButton';
import styles from './Styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: true,
      email:            '',
      password:         '',
      secondaryText:    props.newAccount ? '' : 'or create an account',
      buttonText:       props.newAccount ? 'Register' : 'Login',
      waiting:          false
    };
  }

  onEmail(email) {
    this.state.email = email;

    this.setState({isButtonDisabled: this.isButtonDisabled()});
  }

  onPassword(password) {
    this.state.password = password;

    this.setState({isButtonDisabled: this.isButtonDisabled()});
  }

  onLogin() {
    const email = this.state.email;
    const password = this.state.password;

    this.setState({waiting: true});

    if (this.props.newAccount) {
      this.props.dispatch(AuthActions.register(email, password));
    } else {
      this.props.dispatch(AuthActions.login(email, password));
    }
  }

  onRegister() {
    Actions.register();
  }

  isButtonDisabled() {
    const email = this.state.email;
    const password = this.state.password;

    if (!email || !password) {
      return true;
    }

    if (email.indexOf('@') < 0) {
      return true;
    }

    if (email.indexOf('.') < 0) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.card}>
            <BasicText
              styles={[styles.cardContent, styles.h1]}
              content='Safe Together'
            />
            <BasicText
              styles={styles.label}
              content='Email'
            />
            <TextInput style={styles.textInput} onChangeText={this.onEmail.bind(this)} keyboardType='email-address' placeholder='your email address' returnKeyType='next' returnKeyLabel='next' />
            <BasicText
              styles={styles.label}
              content='Password'
            />
            <TextInput style={styles.textInput} onChangeText={this.onPassword.bind(this)} placeholder='your password' returnKeyType='done' returnKeyLabel='done' secureTextEntry={true} />
          </View>
          <View style={[styles.card]}>
            <AsyncButton waiting={this.state.waiting} title={this.state.buttonText} onPress={this.onLogin.bind(this)} disabled={this.state.isButtonDisabled} />
            <BasicText
              onPress={this.onRegister.bind(this)}
              styles={styles.secondaryLink}
              content={this.state.secondaryText}
            />
          </View>
          <AppInfo />
        </ScrollView>
      </View>
    );
  }
}

export default connect()(Login);
