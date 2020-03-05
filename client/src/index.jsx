import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  loginHandler(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="header-container">
        <div className="header-title">
          <h2>GymFinder</h2>
        </div>
        <div className="header-nav">
          <div className="header-home">Home</div>
          {this.state.isLoggedIn ? 
            <div className="header-account">Account</div> :
            <div className="header-login">Account
              <div className="login-panel">
                <h4>Login</h4>
                <label className="login-username">Username:
                  <br></br>
                  <input type="text" name="username"></input>
                </label>
                <label className="login-pswd">Password:
                  <br></br>
                  <input type="password" name="password"></input>
                </label>
                <button>Login</button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Header />, document.getElementById("header"));