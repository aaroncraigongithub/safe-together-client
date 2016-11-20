import { Alert } from 'react-native';

const Messages = {
  alert(title, message) {
    Alert.alert(title, message);
  }
};

export default Messages;
