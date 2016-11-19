import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import BasicText from './BasicText';
import FlatButton from './FlatButton';
import styles from './Styles';

class AddContactsButton extends Component {
  render() {
    return (
      <View style={styles.card}>
        <BasicText
          styles={[styles.cardContent, styles.h1]}
          content='Add friends to your network'
        />
        <BasicText
          styles={styles.cardContent}
          content='You need to add friends to your network so that, in time of need, we know who to contact.'
        />
        <View style={styles.cardActions}>
          <FlatButton text='Add contacts' onPress={this.props.onPress} />
        </View>
      </View>
    );
  }
}

export default connect()(AddContactsButton);
