import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div id="login-container">
        <form className="ui form center aligned container">
          <div className="field">
            <div className="ui transparent input">
              <input
                id="input-text"
                type="text"
                placeholder="Enter username..."
                minLength="2"
                maxLength="10"
              />
            </div>
          </div>
            <button id="login-button" className="ui button" type="submit">
              Create user / Log in
            </button>
        </form>
      </div>
    );
  }
}
