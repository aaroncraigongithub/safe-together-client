import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class ConfirmRequired extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.infoCard]}>
          <View style={styles.centeredChildren}>
            <Image source={require('./../img/welcome.jpg')} />
          </View>
        </View>
        <View style={styles.card}>
          <BasicText
            styles={[styles.cardContent, styles.h1]}
            content='Welcome to the Safe Together movement.'
          />
          <BasicText
            styles={[styles.cardContent, styles.paragraph]}
            content='Please check your email to confirm your account.'
          />
        </View>
      </View>
    );
  }
}

export default connect()(ConfirmRequired);
