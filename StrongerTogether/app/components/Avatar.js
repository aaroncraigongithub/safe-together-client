import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BasicText from './BasicText';
import styles from './Styles';

class Avatar extends Component {
  render() {
    return (
      this.props.image ?
        <Image style={styles.avatar} source={{uri: this.props.image}} /> :
        <Icon name='user' size={50} color='#ddd' />
    );
  }
}

export default connect()(Avatar);
