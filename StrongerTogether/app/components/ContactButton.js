import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  View,
  Platform,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Avatar from './Avatar'
import UndoableButton from './UndoableButton'
import BasicText from './BasicText'
import styles from './Styles';

class ContactButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaiting:       false,
      showEmailsStyle: styles.hidden
    };
  }

  onPress() {
    if (this.props.contact.emails.length > 1) {
      this.setState({showEmailsStyle: styles.card});
    } else {
      this.onSelectedEmail(this.props.contact.emails[0]);
    }
  }

  onSelectedEmail(email) {
    this.setState({isWaiting: true, showEmailsStyle: styles.hidden});
    this.props.onPress(email);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.contact.emails.toString() !==
        this.props.contact.emails.toString()) {
          this.state.isWaiting = false;
          this.state.showEmailsStyle = styles.hidden;
        }

    return true;
  }

  render() {
    const contact = this.props.contact;

    return (
      <View>
        <View style={styles.card}>
          <View style={styles.cardWithThumbnail}>
            <Avatar image={contact.thumbnailPath} />
            <View>
              <BasicText
                styles={[styles.cardContent, styles.title]}
                content={contact.name}
              />
              {contact.emails.map((email) => (
                <BasicText
                  key={email + '-display'}
                  styles={styles.cardContent}
                  content={email}
                />
              ))}
            </View>
          </View>
          <View style={styles.cardActions}>
            <UndoableButton
              text='Add'
              undoLabel={'inviting ' + contact.name}
              onPress={this.onPress.bind(this)}
              waiting={this.state.isWaiting}
            />
          </View>
        </View>
        <View style={this.state.showEmailsStyle}>
          <BasicText
            styles={[styles.cardContent, styles.h1]}
            content='Select an email address'
          />
          {contact.emails.map((email) => (
            <BasicText
              key={email}
              styles={[styles.linkText, styles.listItem]}
              content={email}
              onPress={this.onSelectedEmail.bind(this, email)}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default connect()(ContactButton);
