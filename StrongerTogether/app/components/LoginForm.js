import React, { PropTypes } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image
} from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

const LoginForm = ({
  onLogin,
  onEmail,
  onPassword,
  onSecondary,
  secondaryText,
  buttonText,
  loading,
  buttonDisabled }) => (
    <ScrollView style={styles.container}>
      <View style={[styles.card, styles.infoCard, styles.centeredChildren]}>
        <Image source={require('./../img/welcome.jpg')} />
      </View>
      <View style={[styles.card, styles.infoCard]}>
        <BasicText
          styles={[styles.cardContent, styles.h1]}
          content='Welcome to the Stronger Together app.'
        />
        <BasicText
          styles={[styles.cardContent, styles.paragraph]}
          content='Welcome to the Stronger Together movement.  We are a group of people who are ready to stand against racism, bigotry, and sexual harassment.'
        />
        <BasicText
          styles={[styles.cardContent, styles.paragraph]}
          content='If you are afraid for your safety, use this app to find a nearby friend (or friends!) who can walk you home, help diffuse a situation or just sit with you.'
        />
      </View>
      <View style={styles.card}>
        <BasicText
          styles={styles.label}
          content='Email'
        />
        <TextInput style={styles.textInput} onChangeText={onEmail} keyboardType='email-address' placeholder='your email address' returnKeyType='next' returnKeyLabel='next' />
        <BasicText
          styles={styles.label}
          content='Password'
        />
        <TextInput style={styles.textInput} onChangeText={onPassword} placeholder='your password' returnKeyType='done' returnKeyLabel='done' secureTextEntry={true} />
      </View>
      <View style={[styles.card]}>
        <Button title={buttonText} onPress={onLogin} disabled={buttonDisabled} />
        <BasicText
          onPress={onSecondary}
          styles={styles.secondaryLink}
          content={secondaryText}
        />
      </View>
    </ScrollView>
)

LoginForm.propTypes = {
  onLogin:        PropTypes.func.isRequired,
  onEmail:        PropTypes.func.isRequired,
  onPassword:     PropTypes.func.isRequired,
  loading:        PropTypes.bool.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  buttonText:     PropTypes.string.isRequired,
  secondaryText:  PropTypes.string.isRequired
}

export default LoginForm
