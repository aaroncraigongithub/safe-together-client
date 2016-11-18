import React, { Component } from 'react'
import { connect } from 'react-redux';
import BasicText from './BasicText';
import styles from './Styles';

class FlatButton extends Component {
  render() {
    return (
      <Button title={this.props.text} onPress={this.props.onPress} />
    );
  }
}

export default connect()(FlatButton);
