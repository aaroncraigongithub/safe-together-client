import React, { PropTypes } from 'react'
import { View, Button } from 'react-native';

const AlertButton = ({ onAlert, styles }) => (
  <View style={styles.container}>
    <Button title='Send an alert' onPress={onAlert} />
  </View>
)

AlertButton.propTypes = {
  onAlert: PropTypes.func.isRequired,
  styles:  PropTypes.object.isRequired
}

export default AlertButton
