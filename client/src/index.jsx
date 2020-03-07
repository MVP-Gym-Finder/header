import React from 'react';
import ReactDOM from 'react-dom';
// const firebase = require('firebase/app');
require('firebase/auth');
// const firebaseui = require('firebaseui');


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogin: { display: 'none'},
      isLoggedIn: false,
      isSigningUp: false,
      email: '',
      password: '',
      passwordCheck: '',
      passwordMismatch: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.createAccountHandler = this.createAccountHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  toggleDropdown() {
    this.setState((prevState) => {
      if (prevState.showLogin.display === 'none') {
        return { showLogin: { display: 'block'} };
      } else {
        return { showLogin: { display: 'none'} };
      }
    });
  }

  loginHandler(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => alert('Error logging in: ', error.message))
      .then(() => {
        this.setState({
          isLoggedIn: true,
          email: '',
          password: '',
        });
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      });
  }

  signupHandler(e) {
    e.preventDefault();
    this.setState({
      isSigningUp: true
    });
  }

  createAccountHandler(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordCheck) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => alert('Error creating account:', error.message))
        .then(() => {
          this.setState({
            passwordMismatch: false,
            isLoggedIn: true,
            email: '',
            password: '',
            passwordCheck: '',
          });
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
          document.getElementById('passwordCheck').value = '';
        });
    } else {
      this.setState({
        passwordMismatch: true,
      });
    }
  }

  cancelHandler(e) {
    e.preventDefault();
    this.setState({
      isSigningUp: false
    });
  }

  logoutHandler(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          isLoggedIn: false
        });
      })
      .catch((error) => alert('Error signing out: ', error.message));
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
            <div className="header-account"> <span onClick={this.toggleDropdown}>Account</span>
              <div className="login-panel" style={this.state.showLogin}>
                <div className="account-panel-profile">Profile</div>
                <div className="account-panel-settings">Settings</div>
                <button className="signout-btn" onClick={this.logoutHandler}>Sign Out</button>
              </div>
            </div> :
            <div className="header-login"> <span onClick={this.toggleDropdown}>Account</span>
              {this.state.isSigningUp ? 
              <div className="login-panel" style={this.state.showLogin}>
                <h4>Create Account</h4>
                <label className="login-email">Email:
                  <br></br>
                  <input type="text" id="email" onChange={this.changeHandler}></input>
                </label>
                <label className="login-pswd">Password:
                  <br></br>
                  <input type="password" id="password" onChange={this.changeHandler}></input>
                </label>
                <label className="login-pswd-check">Confirm Password:
                  <br></br>
                  <input type="password" id="passwordCheck" onChange={this.changeHandler}></input>
                </label>
                <div className="login-panel-btns">
                  <button className="login-create-account" onClick={this.createAccountHandler}>Create Account</button>
                  <button className="login-cancel-create" onClick={this.cancelHandler}>Cancel</button>
                </div>
              </div>
              :
              <div className="login-panel" style={this.state.showLogin}>
                <h4>Login</h4>
                <label className="login-email">Email:
                  <br></br>
                  <input type="text" id="email" onChange={this.changeHandler}></input>
                </label>
                <label className="login-pswd">Password:
                  <br></br>
                  <input type="password" id="password" onChange={this.changeHandler}></input>
                </label>
                <div className="login-panel-btns">
                  <button className="login-login" onClick={this.loginHandler}>Login</button>
                  <button className="login-signup" onClick={this.signupHandler}>Sign Up</button>
                </div>
              </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Header />, document.getElementById("header"));