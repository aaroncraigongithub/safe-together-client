import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.infoCard, styles.centeredChildren]}>
          <Image source={require('./../img/welcome.jpg')} />
        </View>
        <View style={[styles.card, styles.infoCard, styles.centeredChildren]}>
          <BasicText
            styles={[styles.cardContent]}
            content='Preparing app...'
          />
        </View>
      </View>
    );
  }
}

export default connect()(Splash);
