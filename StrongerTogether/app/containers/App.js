import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize:   30,
    fontWeight: 'bold'
  }
});

class App extends Component {
  render() {
   return (
      <View style={styles.container}>
        <Image source={require('./../img/welcome.jpg')} style={{width: 500, height: 312}} />
        <Text style={styles.header}>Stronger Together</Text>
        <Text>Preparing the app...</Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
