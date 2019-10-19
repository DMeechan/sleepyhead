import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

let username;

const handleChange = event => {
  username = event.target.value;
  console.log(event.target.value)
};

const submitLogin = (event) => {
  event.preventDefault();
  axios
    .post(`https://sleepyhead-server.onrender.com/api/user`, {
      username: username
    })
    .then(res => {
      //Sets the uuid in local storage to know if user is logged in or not
      localStorage.setItem('uuid', res.data.uuid);
      console.log(localStorage.getItem('uuid'));
      window.location.reload();
    });
};

export default class Login extends React.Component {
  render() {
    if (localStorage.getItem('uuid') !== null) {
      return <Redirect to="/" />;
    }

    return (
      <div id="login-container">
        <form className="ui form center aligned container">
          <div className="field">
            <div className="ui transparent input">
              <input
                id="user-name"
                type="text"
                placeholder="Enter username..."
                minLength="2"
                maxLength="10"
                onChange={handleChange}
              />
            </div>
          </div>

          <button id="login-button" className="ui button" onClick={submitLogin}>
            <div id="button-text">Create user / Log in</div>
          </button>
        </form>
      </div>
    );
  }
}
