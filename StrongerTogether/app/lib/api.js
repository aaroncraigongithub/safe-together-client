const Api = {
  baseUrl: 'https://stronger-together.herokuapp.com/v1/',

  login(email, password) {
    return this.post('login', {
      email: email,
      password: password,
    })
    .then(response=> {
      const parsed = this.parseResponse(response);

      return parsed.token;
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

  post(endpoint, params) {
    return fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
  },

  parseResponse(response) {
    if (response.status !== 200) {
      console.log("API ERROR", response);

      throw {
        status:  response.status,
        message: response.statusText || 'There was an error on the server',
        error:   response._bodyInit ?
          JSON.parse(response._bodyInit).errors[0] : null
      };
    }

    return response.json();
  }
}

export default Api
