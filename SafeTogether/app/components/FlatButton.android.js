import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class FlatButton extends Component {
  render() {
    const uppercase = this.props.text.toUpperCase();

    return (
      <View style={styles.row}>
        <BasicText
          styles={styles.flatButton}
          onPress={this.props.onPress}
          content={uppercase}
        />
      </View>
    );
  }
}

export default connect()(FlatButton);
