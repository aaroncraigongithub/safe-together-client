import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import FlatButton from './FlatButton';
import BasicText from './BasicText';
import styles from './Styles';

class Undo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUndoActive: false,
      countdown:    3,
      timer:        null
    };
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  stopTimer() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      this.state.timer = null;
    }
  }

  onPress() {
    this.setState({isUndoActive: true, countdown: 3});

    this.state.timer = setInterval(() => {
      c = this.state.countdown;

      this.setState({countdown: c - 1});

      if (c === 0) {
        this.stopTimer();
        this.props.onPress();
        this.state.isUndoActive = false;
      }
    }, 1000);
  }

  onUndo() {
    this.stopTimer();
    this.setState({isUndoActive: false});
  }

  render() {
    return (
      <View style={styles.row}>
        {
          this.props.waiting ?
            <ActivityIndicator
              color='#2196F3'
              style={styles.buttonSpinner}
            />
          :
            this.state.isUndoActive ?
              <View style={styles.row}>
                <BasicText
                  styles={styles.bold}
                  content={this.state.countdown}
                />
                <BasicText
                  styles={styles.undoLinkLabel}
                  content={this.props.undoLabel + '...'}
                />
                <BasicText
                  styles={styles.linkText}
                  content='Undo'
                  onPress={this.onUndo.bind(this)}
                />
              </View>
            :
              <FlatButton
                text={this.props.text}
                onPress={this.onPress.bind(this)}
              />
        }
      </View>
    );
  }
}

export default connect()(Undo);
