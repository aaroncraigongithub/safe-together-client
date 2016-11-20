import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class AppInfo extends Component {
  render() {
    return (
      <View style={[styles.card, styles.infoCard]}>
        <View style={styles.centeredChildren}>
          <Image source={require('./../img/welcome.jpg')} />
        </View>
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
    );
  }
}

export default connect()(AppInfo);
