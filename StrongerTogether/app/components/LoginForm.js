import React, { PropTypes } from 'react'
import { View, Text, TextInput, Button } from 'react-native';

const LoginForm = ({
  onLogin,
  onEmail,
  onPassword,
  onSecondary,
  secondaryText,
  buttonText,
  styles,
  loading,
  buttonDisabled }) => (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.textInput} onChangeText={onEmail} keyboardType='email-address' placeholder='your email address' returnKeyType='next' returnKeyLabel='next' />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.textInput} onChangeText={onPassword} placeholder='your password' returnKeyType='done' returnKeyLabel='done' secureTextEntry={true} />
      <Button title={buttonText} onPress={onLogin} disabled={buttonDisabled} />
      <Text onPress={onSecondary} style={styles.secondaryLink}>{secondaryText}</Text>
    </View>
)

LoginForm.propTypes = {
  onLogin:        PropTypes.func.isRequired,
  onEmail:        PropTypes.func.isRequired,
  onPassword:     PropTypes.func.isRequired,
  loading:        PropTypes.bool.isRequired,
  styles:         PropTypes.object.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  buttonText:     PropTypes.string.isRequired,
  secondaryText:  PropTypes.string.isRequired
}

export default LoginForm
