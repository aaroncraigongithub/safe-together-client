import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, ActivityIndicator } from 'react-native';
import styles from './Styles';

class AsyncButton extends Component {
  render() {
    return (
        this.props.waiting ?
          <ActivityIndicator
            color='#2196F3'
            style={styles.buttonSpinner}
          />
        :
        <Button title={this.props.title} onPress={this.props.onPress} disabled={this.props.disabled} />
    );
  }
}

export default connect()(AsyncButton);
