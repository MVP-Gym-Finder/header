import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="header-container">
        <div className="header-title">GymFinder</div>
        <div className="header-nav">
          <div className="header-home">Home</div>
          <div className="header-login">Login</div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Header />, document.getElementById("header"));