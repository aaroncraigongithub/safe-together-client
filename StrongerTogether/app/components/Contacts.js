import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from './../lib/api';
import * as ContactActions from './../actions/contacts';
import * as FriendActions from './../actions/friends';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactButton from './ContactButton'
import {
  View,
  Button,
  Text,
  ListView,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import BasicText from './BasicText';
import styles from './Styles';

class Contacts extends Component {
  componentDidMount() {
    if (this.props.contacts.length === 0) {
      this.props.dispatch(FriendActions.loadFriends());
      this.props.dispatch(ContactActions.loadContacts());
    }
  }

  onContactPress(email) {
    Api.inviteFriends([email]).then(friends => {
      this.props.dispatch(FriendActions.updateFriends(friends));
    });
  }

  render() {
    let dataSource = null;

    if (this.props.contacts.length > 0) {
      ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.name !== r2.name
      });

      dataSource = ds.cloneWithRows(this.props.contacts);
    }

    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.infoCard]}>
          <BasicText
            styles={[styles.cardContent, styles.paragraph]}
            content='Select from the list below to add your friends to your network.'
          />
          <BasicText
            styles={[styles.cardContent, styles.paragraph]}
            content='We suggest only adding friends who are typically nearby.'
          />
        </View>
        {dataSource ? <ListView
                        dataSource={dataSource}
                        renderRow={(rowData) => (
                          <ContactButton
                            contact={rowData}
                            onPress={this.onContactPress.bind(this)}
                          />
                        )}
                      /> :
                      <View style={[styles.card, {flexDirection: 'row'}]}>
                        <ActivityIndicator
                          color='#2196F3'
                          style={styles.buttonSpinner}
                        />
                        <BasicText
                          styles={styles.cardContent}
                          content='Loading contacts...'
                        />
                      </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.filtered
  };
}

export default connect(mapStateToProps)(Contacts);
