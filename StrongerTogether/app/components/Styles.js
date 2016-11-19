import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // Views and boxes
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#e0ecff' : '#ffffff',
    paddingTop: Platform.OS === 'android' ? 60 : 65,
    paddingLeft: Platform.OS === 'android' ? 10 : 0,
    paddingRight: Platform.OS === 'android' ? 10 : 0
  },
  centeredChildren: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },

  // Typography
  basicText: {
    fontSize: Platform.OS === 'android' ? 25 : 15
  },
  alignRight: {
    textAlign: 'right'
  },
  h1: {
    fontSize:   Platform.OS === 'android' ? 27 : 17,
    fontWeight: 'bold',
    marginBottom: 10
  },
  title: {
    fontSize:   Platform.OS === 'android' ? 27 : 17,
    fontWeight: 'bold'
  },
  paragraph: {
    marginBottom: 10
  },
  bold: {
    fontWeight: 'bold'
  },

  // Links
  linkText: {
    color: '#2196F3',
    fontWeight: 'bold'
  },
  undoLinkLabel: {
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold'
  },

  // Buttons
  flatButton: {
    backgroundColor: 'transparent',
    color: '#2196F3',
    fontWeight: 'bold'
  },
  secondaryLink: {
    marginTop: 10,
    textAlign: 'center'
  },

  // Forms
  label: {
    fontWeight: 'bold'
  },
  textInput: {
    height: 40
  },

  // UI elements
  avatar: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  hidden: {
    width: 0,
    height: 0
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10
  },
  spinnerLabel: {
    marginLeft: 10
  },

  // Cards
  card: {
    backgroundColor: Platform.OS === 'android' ? '#fff' : '#efefef',
    borderRadius: Platform.OS === 'android' ? 2 : 0,
    borderColor: Platform.OS === 'android' ? '#fff' : 'rgba(0, 0, 0, 0.25)',
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderBottomWidth: Platform.OS === 'android' ? 1 : 1,
    marginTop: Platform.OS === 'android' ? 5 : 0,
    marginBottom: Platform.OS === 'android' ? 5 : 0,
    padding: 10,
    shadowColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.12)' : 'transparent',
    shadowOpacity: Platform.OS === 'android' ? 0.8 : 0,
    shadowRadius: Platform.OS === 'android' ? 2 : 0,
    shadowOffset: {
      height: Platform.OS === 'android' ? 1 : 0,
      width: Platform.OS === 'android' ? 2 : 0,
    },
  },
  infoCard: {
    backgroundColor: '#fff'
  },
  cardWithThumbnail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Platform.OS === 'android' ? 15 : 0,
  },
  cardContent: {
    color: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(0, 0, 0, 0.60)',
  },
  cardActions: {
    borderStyle: 'solid',
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    paddingTop: Platform.OS === 'android' ? 15 : 5,
    padding: Platform.OS === 'android' ? 15 : 0,
    marginTop: Platform.OS === 'android' ? 0 : 5,
  }
});

export default styles;
