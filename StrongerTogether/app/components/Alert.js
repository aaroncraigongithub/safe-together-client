import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Platform } from 'react-native';
import BasicText from './BasicText';
import FlatButton from './FlatButton';
import styles from './Styles';

class Alert extends Component {
  onSendAlert() {
    console.log('ALERT!');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <BasicText
            styles={[styles.paragraph, styles.cardContent]}
            content='Click the button below to send notifications to your network to let them know you need help.'
          />
          <Button title='Send an alert' onPress={this.onSendAlert.bind(this)} />
        </View>
        <View style={this.props.hasFriends ? styles.hidden : {height: 200}}>
          <View style={styles.card}>
            <BasicText
              styles={[styles.cardContent, styles.h1]}
              content='Add friends to your network'
            />
            <BasicText
              styles={styles.cardContent}
              content='You need to add friends to your network so that, in time of need, we know who to contact.'
            />
            <View style={styles.cardActions}>
              <FlatButton text='Add contacts' onPress={Actions.contacts} />
            </View>
          </View>
        </View>
        <View style={this.props.hasFriends ? {height: 200} : styles.hidden }>
          <BasicText
            content='There are {this.props.friendCount} friends currently in your network'
          />
          <BasicText
            styles={[styles.alignRight, styles.linkText]}
            content='add more contacts'
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasFriends:  state.friends.count > 0,
    friendCount: state.friends.count
  };
}

export default connect(mapStateToProps)(Alert);
