import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadFriends } from './../actions/friends';
import { alert } from './../actions/alert';
import AddContactsButton from './AddContactsButton';
import AlertButton from './AlertButton';
import FriendCount from './FriendCount';
import Loading from './Loading';
import styles from './Styles';

class Alert extends Component {
  componentDidMount() {
    this.props.dispatch(loadFriends());
  }

  onSendAlert() {
    // this.props.dispatch(alert());
  }

  render() {
    return (
      this.props.isLoading ?
        <View style={styles.container}>
          <Loading />
        </View>
        :
        (
          <View style={styles.container}>
            <View style={{flex: 0.85}}>
              {
                this.props.friendCount === 0 ?
                  <AddContactsButton onPress={Actions.contacts} />
                  :
                  <AlertButton onPress={this.onSendAlert.bind(this)} disabled={!this.props.alertActive} />
              }
            </View>
            <View style={{flex: 0.15}}>
              {
                this.props.friendCount > 0 ?
                  <FriendCount count={this.props.friendCount} onAddFriends={Actions.contacts} />
                  :
                  null
              }
            </View>
          </View>
        )
    );
  }
}

const mapStateToProps = (state) => {
  const count = state.friends.confirmed.length;

  return {
    isLoading:          state.friends.txState !== 'complete',
    friendCount:        count,
    alertActive:        count > 0
  };
}

export default connect(mapStateToProps)(Alert);
