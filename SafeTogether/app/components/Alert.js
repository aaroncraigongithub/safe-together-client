import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { loadFriends } from './../actions/friends';
import Api from './../lib/api';
import Messages from './../lib/messages';
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
    Api.alert().then(() => {
      Messages.alert('Alert sent', 'The alert has been sent to ' + this.props.friendCount + ' friends.');
    })
    .catch(error => {
      let title   = 'There was a problem';
      let message = error.error ?
        error.error.message : 'There was an error sending this alert.';

      Messages.alert(title, message);
    });
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
