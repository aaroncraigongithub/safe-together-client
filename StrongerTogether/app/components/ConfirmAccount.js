import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { confirm } from './../actions/user';
import Loading from './Loading';
import styles from './Styles';

class ConfirmAccount extends Component {
  componentDidMount() {
    this.props.dispatch(confirm(this.props.token));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Loading text='Confirming your account...' />
        </View>
      </View>
    );
  }
}

export default connect()(ConfirmAccount);
