import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class Loading extends Component {
  render() {
    const text = this.props.text || 'Loading...'

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <ActivityIndicator
            color='#2196F3'
            style={styles.buttonSpinner}
          />
          <BasicText content={text} styles={[styles.spinnerLabel, this.props.textStyles]} />
        </View>
      </View>
    );
  }
}

export default connect()(Loading);
