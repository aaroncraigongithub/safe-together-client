import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

const Api = {
  baseUrl: 'https://stronger-together.herokuapp.com/v1/',

  setToken(token) {
    console.log('TOKEN', token);
    this.token = token;
  },

  login(email, password) {
    return this.post('sessions', {
      email: email,
      password: password,
    })
    .then(response=> {
      return this.parseResponse(response);
    })
    .then(json=> {
      return json.token;
    });
  },

  register(email, password) {
    return this.post('users', {
      email: email,
      password: password,
    })
    .then(response=> {
      return this.parseResponse(response)
    })
    .then(json=> {
      return json.token;
    });
  },

  inviteFriends(emails) {
    return this.jsonPost('friends/invite', {emails: emails});
  },

  getFriends() {
    return this.jsonGet('friends');
  },

  jsonGet(endpoint, params = {}) {
    return this
             .get(endpoint, params)
             .then(response => (this.parseRecords(response)));
  },

  get(endpoint, params = {}) {
    const url = this.urlForGet(endpoint, params);

    return fetch(url, {
      method:  'GET',
      headers: this.requestHeader()
    });
  },

  urlForGet(endpoint, params) {
    const keys = Object.keys(params);

    if (keys.length === 0) {
      return this.baseUrl + endpoint;
    }

    const query = keys
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');

    return this.baseUrl + endpoint + '?' + query;
  },

  jsonPost(endpoint, params = {}) {
    return this
             .post(endpoint, params)
             .then(response => (this.parseRecords(response)));
  },

  post(endpoint, params = {}) {
    return fetch(this.baseUrl + endpoint, {
      method:  'POST',
      headers: this.requestHeader(),
      body:    JSON.stringify(params)
    });
  },

  parseRecords(response) {
    return this
              .parseResponse(response)
              .then(json=> {
                return this.mapObjects(json);
              });
  },

  parseResponse(response) {
    if (response.status !== 200) {
      console.log("API ERROR", response);

      if (response.status === 403) {
        Alert.alert('You have been logged out', 'Please log in again');

        Actions.login({type: 'replace'});
      } else {
        throw {
          status:  response.status,
          message: response.statusText || 'There was an error on the server',
          error:   response._bodyInit ?
            JSON.parse(response._bodyInit).errors[0] : null
        };
      }
    }

    return response.json();
  },

  requestHeader() {
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.token) {
      header.Authorization = 'Bearer ' + this.token;
    }

    return header;
  },

  mapObjects(json) {
    const data    = json.data || json;
    const related = json.included || [];

    if (Array.isArray(data)) {
      return data.map(item => {
        return this.mapObject(item, related);
      });
    }

    return this.mapObject(data, related);
  },

  mapObject(data, related) {
    if (related.length === 0) {
      return this.mapFields(data);
    }

    const types = Object.keys(data.relationships);
    types.forEach(type => {
      data.relationships[type] = this.getRelatedData(
                                                      data.relationships[type],
                                                      related
                                                    );
    });

    return this.mapFields(data);
  },

  getRelatedData(info, related) {
    if (Array.isArray(info)) {
      return info.map(item => {
        return this.getRelatedItem(item.data, related);
      });
    }

    return this.getRelatedItem(info.data, related);
  },

  getRelatedItem(info, related) {
    for (var i = 0; i < related.length; i++) {
      if (related[i].type === info.type && related[i].id === info.id) {
        return this.mapObjects(related[i]);
      }
    }

    return null;
  },

  mapFields(item) {
    const keys = Object.keys(item.attributes);

    keys.forEach(key => {
      const snake = this.toSnakeCase(key);

      if (snake === key) {
        return;
      }

      item.attributes[snake] = item.attributes[key];
      delete item.attributes[key];
    });

    return item;
  },

  toSnakeCase(input) {
    const pieces = input.split('-');
    const first = pieces.shift();

    return first + pieces.map(s => (this.capitalize(s)));
  },

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default Api
