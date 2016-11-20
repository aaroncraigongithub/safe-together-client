import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirm } from './../actions/friends';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import styles from './Styles';

class ConfirmFriend extends Component {
  componentDidMount() {
    this.props.dispatch(confirm(this.props.token));

    setTimeout(() => {
      Actions.alert({type: 'replace'});
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Loading text='Accepting invitation...' />
        </View>
      </View>
    );
  }
}

export default connect()(ConfirmFriend);
