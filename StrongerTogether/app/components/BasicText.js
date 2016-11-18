import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text } from 'react-native';
import styles from './Styles';

class BasicText extends Component {
  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <Text
        style={[styles.basicText, this.props.styles]}
        onPress={this.onPress.bind(this)}
      >
        {this.props.content}
      </Text>
    );
  }
}

export default connect()(BasicText);
