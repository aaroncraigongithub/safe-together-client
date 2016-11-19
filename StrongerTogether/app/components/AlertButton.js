import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class AlertButton extends Component {
  render() {
    const title = this.props.disabled ? 'Add friends to send an alert' : 'Send an alert'
    return (
      <View style={styles.card}>
        <BasicText
          styles={[styles.paragraph, styles.cardContent]}
          content='Click the button below to send notifications to your network to let them know you need help.'
        />
        <Button title={title} onPress={this.props.onPress} disabled={this.props.disabled} />
      </View>
    );
  }
}

export default connect()(AlertButton);
