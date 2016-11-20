import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class FriendCount extends Component {
  render() {
    return (
      <View style={styles.card}>
        <BasicText
          content={'There are ' + this.props.count + ' friends currently in your network'}
        />
        <BasicText styles={styles.linkText} content='add more contacts' onPress={this.props.onAddFriends} />
      </View>
    );
  }
}

export default connect()(FriendCount);
